import "reflect-metadata";
import type { ZodType } from "zod";

/**
 * Metadata keys for the Zod-backed Swagger/OpenAPI decorators below.
 * Mirrors the style of `core/decorators` (Reflect metadata on the
 * controller class / class+propertyKey), but lives in `presentation/`
 * because it's documentation-only concern for the HTTP delivery layer,
 * not part of the request pipeline in `core`.
 */
export const API_TAGS_METADATA = Symbol.for("swagger:tags");
export const API_OPERATION_METADATA = Symbol.for("swagger:operation");
export const API_BODY_METADATA = Symbol.for("swagger:body");
export const API_QUERY_METADATA = Symbol.for("swagger:query");
export const API_RESPONSE_METADATA = Symbol.for("swagger:responses");
export const API_BEARER_AUTH_METADATA = Symbol.for("swagger:bearer-auth");

export interface ApiOperationOptions {
  summary: string;
  description?: string;
}

export interface ApiBodyOptions {
  /** Zod schema describing the request body (usually a DTO's `*Schema`). */
  schema: ZodType;
  description?: string;
}

export interface ApiQueryOptions {
  /** Zod object schema whose top-level keys become query params. */
  schema: ZodType;
}

export interface ApiResponseOptions {
  status: number;
  description: string;
  /** Zod schema describing the response envelope. */
  schema?: ZodType;
}

/** Class decorator — groups a controller's routes under a Swagger tag. */
export function ApiTags(...tags: string[]): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(API_TAGS_METADATA, tags, target);
  };
}

/** Method decorator — summary/description shown for a single route. */
export function ApiOperation(options: ApiOperationOptions): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(
      API_OPERATION_METADATA,
      options,
      target.constructor,
      propertyKey,
    );
  };
}

/** Method decorator — documents the request body from a Zod schema. */
export function ApiBody(options: ApiBodyOptions): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(
      API_BODY_METADATA,
      options,
      target.constructor,
      propertyKey,
    );
  };
}

/** Method decorator — documents query params from a Zod object schema. */
export function ApiQuery(options: ApiQueryOptions): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(
      API_QUERY_METADATA,
      options,
      target.constructor,
      propertyKey,
    );
  };
}

/** Method decorator — documents a response status with a Zod schema. Repeatable. */
export function ApiResponse(options: ApiResponseOptions): MethodDecorator {
  return (target, propertyKey) => {
    const existing: ApiResponseOptions[] =
      Reflect.getMetadata(
        API_RESPONSE_METADATA,
        target.constructor,
        propertyKey,
      ) || [];
    Reflect.defineMetadata(
      API_RESPONSE_METADATA,
      [...existing, options],
      target.constructor,
      propertyKey,
    );
  };
}

/**
 * Class or method decorator — marks a route as requiring the Bearer/JWT
 * auth scheme in the Swagger UI (padlock icon + "Authorize" support).
 * Apply anywhere `@UseGuards(AuthGuard)` is used, at the same class/method
 * level, so docs match real guard behavior.
 */
export function ApiBearerAuth(): ClassDecorator & MethodDecorator {
  return ((target: any, propertyKey?: string | symbol) => {
    if (propertyKey) {
      Reflect.defineMetadata(
        API_BEARER_AUTH_METADATA,
        true,
        target.constructor,
        propertyKey,
      );
      return;
    }
    Reflect.defineMetadata(API_BEARER_AUTH_METADATA, true, target);
  }) as ClassDecorator & MethodDecorator;
}
