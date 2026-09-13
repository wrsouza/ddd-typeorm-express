import type { Application, NextFunction, Request, Response } from "express";
import { Router } from "express";
import "reflect-metadata";
import type { ZodType } from "zod";
import {
  CONTROLLER_METADATA,
  PARAMS_METADATA,
  ParamType,
  ROUTES_METADATA,
  type ParamMeta,
  type RouteDefinitionMeta,
  type Type,
} from "../constants";
import { Container } from "../container";
import type { ClassOrInstance, PipeTransform } from "../interfaces";

function isZodType(dtoType: unknown): dtoType is ZodType {
  return (
    !!dtoType &&
    typeof dtoType === "object" &&
    typeof (dtoType as any).parse === "function"
  );
}

function extractRaw(type: ParamType, key: string | undefined, req: Request) {
  switch (type) {
    case ParamType.PARAM:
      return key ? req.params[key] : req.params;
    case ParamType.QUERY:
      return key ? req.query[key] : req.query;
    case ParamType.HEADERS:
      return key ? req.headers[key] : req.headers;
    case ParamType.REQ:
      return req;
    case ParamType.BODY:
      return key ? req.body?.[key] : req.body;
  }
}

function applyDtoType(
  type: ParamType,
  dtoType: ParamMeta["dtoType"],
  raw: any,
) {
  if (!dtoType) return raw;
  if (isZodType(dtoType)) return dtoType.parse(raw);
  const instance = new (dtoType as Type<any>)();
  return Object.assign(instance, raw);
}

async function applyPipes(
  pipes: ClassOrInstance<PipeTransform>[] = [],
  value: any,
  metadata: {
    type: ParamMeta["type"];
    key?: string;
    dtoType?: ParamMeta["dtoType"];
  },
  container: Container,
) {
  let result = value;
  for (const pipe of pipes) {
    const pipeInstance: PipeTransform =
      typeof pipe === "function" ? container.resolve(pipe) : pipe;
    result = await pipeInstance.transform(result, {
      type: metadata.type.toLowerCase() as any,
      data: metadata.key,
      metatype: metadata.dtoType as any,
    });
  }
  return result;
}

async function buildArgs(
  controller: Type<any>,
  handlerName: string | symbol,
  req: Request,
  container: Container,
): Promise<any[]> {
  const paramsMeta: ParamMeta[] =
    Reflect.getMetadata(PARAMS_METADATA, controller, handlerName) || [];

  const args: any[] = [];
  for (const meta of paramsMeta) {
    const raw = extractRaw(meta.type, meta.key, req);
    const withDto = applyDtoType(meta.type, meta.dtoType, raw);
    args[meta.index] = await applyPipes(meta.pipes, withDto, meta, container);
  }
  return args;
}

function normalizePrefix(prefix: string): string {
  if (!prefix || prefix === "/") return "";
  return prefix.startsWith("/") ? prefix : `/${prefix}`;
}

function joinPaths(prefix: string, path: string): string {
  const joined = `${prefix}${path}`;
  return joined === "" ? "/" : joined;
}

/**
 * Registra no express, para cada controller carregado no Container, uma
 * rota por método marcado com @Get/@Post/@Put/@Patch/@Delete, resolvendo
 * params (@Param/@Body/@Query/@Headers/@Req) e instanciando o controller
 * (com suas dependências) via Container.
 */
export function createExpressAdapter(
  container: Container,
  basePath = "",
): Router {
  const router = Router();

  for (const controller of container.getControllers()) {
    const controllerMeta: { prefix: string } | undefined = Reflect.getMetadata(
      CONTROLLER_METADATA,
      controller,
    );
    const routes: RouteDefinitionMeta[] =
      Reflect.getMetadata(ROUTES_METADATA, controller) || [];

    const prefix = normalizePrefix(controllerMeta?.prefix ?? "");
    const instance = container.resolve<any>(controller);

    for (const route of routes) {
      const fullPath = joinPaths(prefix, route.path);
      const method = route.method.toLowerCase() as
        | "get"
        | "post"
        | "put"
        | "patch"
        | "delete";

      router[method](
        fullPath,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const args = await buildArgs(
              controller,
              route.handlerName,
              req,
              container,
            );
            const result = await instance[route.handlerName](...args);
            res.json(result);
          } catch (err) {
            next(err);
          }
        },
      );
    }
  }

  if (basePath) {
    const wrapper = Router();
    wrapper.use(normalizePrefix(basePath), router);
    return wrapper;
  }

  return router;
}

export function registerRoutes(
  app: Application,
  rootModule: Type<any>,
  options: { container?: Container; basePath?: string } = {},
): Container {
  const container = options.container ?? new Container();
  container.loadModule(rootModule);
  app.use(createExpressAdapter(container, options.basePath));
  return container;
}
