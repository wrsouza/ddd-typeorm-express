import "reflect-metadata";
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  type RouteConfig,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import {
  CONTROLLER_METADATA,
  Container,
  GUARDS_METADATA,
  ROUTES_METADATA,
  type RouteDefinitionMeta,
} from "../../core";
import {
  API_BEARER_AUTH_METADATA,
  API_BODY_METADATA,
  API_OPERATION_METADATA,
  API_QUERY_METADATA,
  API_RESPONSE_METADATA,
  API_TAGS_METADATA,
  type ApiBodyOptions,
  type ApiOperationOptions,
  type ApiQueryOptions,
  type ApiResponseOptions,
} from "../decorators";

// `.openapi()` isn't used directly here (schemas are converted by ref/shape
// only), but extending Zod once at module load keeps every schema in this
// process compatible with future `.openapi()` metadata without a second
// setup step scattered across dtos.
extendZodWithOpenApi(z);

const BEARER_SECURITY_SCHEME = "bearerAuth";

/** `express`-style `:id` path segments -> OpenAPI `{id}` path segments. */
function toOpenApiPath(path: string): string {
  return path.replace(/:([A-Za-z0-9_]+)/g, "{$1}");
}

function extractPathParamNames(path: string): string[] {
  return [...path.matchAll(/:([A-Za-z0-9_]+)/g)].map((match) => match[1]);
}

function hasBearerAuth(
  controller: Function,
  handlerName: string | symbol,
): boolean {
  const classGuards = Reflect.getMetadata(GUARDS_METADATA, controller) || [];
  const methodGuards =
    Reflect.getMetadata(GUARDS_METADATA, controller, handlerName) || [];
  const classBearer = Reflect.getMetadata(API_BEARER_AUTH_METADATA, controller);
  const methodBearer = Reflect.getMetadata(
    API_BEARER_AUTH_METADATA,
    controller,
    handlerName,
  );
  return (
    classGuards.length > 0 ||
    methodGuards.length > 0 ||
    !!classBearer ||
    !!methodBearer
  );
}

function buildRouteConfig(
  controller: Function,
  prefix: string,
  route: RouteDefinitionMeta,
  tags: string[],
): RouteConfig {
  const fullExpressPath = `${prefix}${route.path}` || "/";
  const path = toOpenApiPath(fullExpressPath);
  const method = route.method.toLowerCase() as RouteConfig["method"];

  const operation: ApiOperationOptions | undefined = Reflect.getMetadata(
    API_OPERATION_METADATA,
    controller,
    route.handlerName,
  );
  const bodyOptions: ApiBodyOptions | undefined = Reflect.getMetadata(
    API_BODY_METADATA,
    controller,
    route.handlerName,
  );
  const queryOptions: ApiQueryOptions | undefined = Reflect.getMetadata(
    API_QUERY_METADATA,
    controller,
    route.handlerName,
  );
  const responses: ApiResponseOptions[] =
    Reflect.getMetadata(API_RESPONSE_METADATA, controller, route.handlerName) ||
    [];

  const paramNames = extractPathParamNames(fullExpressPath);
  const params =
    paramNames.length > 0
      ? z.object(
          Object.fromEntries(paramNames.map((name) => [name, z.string()])),
        )
      : undefined;

  const responsesObject: RouteConfig["responses"] = {};
  if (responses.length === 0) {
    responsesObject["200"] = { description: "OK" };
  } else {
    for (const response of responses) {
      responsesObject[String(response.status)] = {
        description: response.description,
        content: response.schema
          ? { "application/json": { schema: response.schema } }
          : undefined,
      };
    }
  }

  const routeConfig: RouteConfig = {
    method,
    path,
    tags,
    summary: operation?.summary ?? `${route.method} ${path}`,
    description: operation?.description,
    request: {
      params,
      query: queryOptions?.schema as any,
      body: bodyOptions
        ? {
            description: bodyOptions.description,
            content: { "application/json": { schema: bodyOptions.schema } },
          }
        : undefined,
    },
    responses: responsesObject,
  };

  if (hasBearerAuth(controller, route.handlerName)) {
    routeConfig.security = [{ [BEARER_SECURITY_SCHEME]: [] }];
  }

  return routeConfig;
}

/**
 * Walks every controller registered in the DI container and, using the
 * custom `@Api*` decorators (`presentation/decorators/swagger.decorator`)
 * plus the existing routing metadata (`@Controller`/`@Get`/`@UseGuards`
 * from `core`), builds a full OpenAPI 3.0 document with zod-to-openapi.
 *
 * There is no real Nest application here (see `core/adapters/express.adapter`)
 * so `@nestjs/swagger`'s `SwaggerModule.setup()` — which requires an
 * `INestApplication` instance to scan — cannot be used as-is. This builds
 * the same kind of document by hand from this project's own metadata, and
 * `server.ts` serves it with `swagger-ui-express`, which only needs a plain
 * Express app.
 */
export function buildOpenApiDocument(container: Container): OpenAPIObject {
  const registry = new OpenAPIRegistry();

  registry.registerComponent("securitySchemes", BEARER_SECURITY_SCHEME, {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  for (const controller of container.getControllers()) {
    const controllerMeta: { prefix: string } | undefined = Reflect.getMetadata(
      CONTROLLER_METADATA,
      controller,
    );
    const routes: RouteDefinitionMeta[] =
      Reflect.getMetadata(ROUTES_METADATA, controller) || [];
    const tags: string[] = Reflect.getMetadata(API_TAGS_METADATA, controller) || [
      controller.name.replace(/Controller$/, ""),
    ];
    const prefix = controllerMeta?.prefix ?? "";

    for (const route of routes) {
      registry.registerPath(
        buildRouteConfig(controller, prefix, route, tags),
      );
    }
  }

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "ddd-test API",
      version: "1.0.0",
      description:
        "DDD/Clean Architecture example project — auto-generated from the " +
        "presentation layer's routing metadata and Zod DTO schemas.",
    },
    servers: [{ url: "/" }],
  });
}
