import "reflect-metadata";
import {
  ROUTES_METADATA,
  type HttpMethod,
  type RouteDefinitionMeta,
} from "../constants";

function createMethodDecorator(method: HttpMethod) {
  return (path = ""): MethodDecorator =>
    (target, propertyKey) => {
      const normalized = path ? (path.startsWith("/") ? path : `/${path}`) : "";
      const existing: RouteDefinitionMeta[] =
        Reflect.getMetadata(ROUTES_METADATA, target.constructor) || [];

      existing.push({ method, path: normalized, handlerName: propertyKey });
      Reflect.defineMetadata(ROUTES_METADATA, existing, target.constructor);
    };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Patch = createMethodDecorator("PATCH");
export const Delete = createMethodDecorator("DELETE");
