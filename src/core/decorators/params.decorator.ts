import "reflect-metadata";
import type { ZodType } from "zod";
import {
  PARAMS_METADATA,
  type ParamMeta,
  ParamType,
  type Type,
} from "../constants";
import type { ClassOrInstance, PipeTransform } from "../interfaces";

function pushParamMeta(
  target: any,
  propertyKey: string | symbol | undefined,
  meta: ParamMeta,
) {
  if (!propertyKey) return;
  const existing: ParamMeta[] =
    Reflect.getMetadata(PARAMS_METADATA, target.constructor, propertyKey) || [];
  existing.push(meta);
  Reflect.defineMetadata(
    PARAMS_METADATA,
    existing,
    target.constructor,
    propertyKey,
  );
}

function createParamDecorator(type: ParamType) {
  return (
      key?: string,
      ...pipes: ClassOrInstance<PipeTransform>[]
    ): ParameterDecorator =>
    (target, propertyKey, index) =>
      pushParamMeta(target, propertyKey, { index, type, key, pipes });
}

function createDtoAwareParamDecorator(type: ParamType.BODY | ParamType.QUERY) {
  return (
      keyOrDtoType?: string | Type<any> | ZodType,
      ...pipes: ClassOrInstance<PipeTransform>[]
    ): ParameterDecorator =>
    (target, propertyKey, index) => {
      const isKey = typeof keyOrDtoType === "string";
      const key = isKey ? keyOrDtoType : undefined;
      const dtoType = !isKey ? keyOrDtoType : undefined;
      pushParamMeta(target, propertyKey, { index, type, key, dtoType, pipes });
    };
}

export const Param = createParamDecorator(ParamType.PARAM);
export const Body = createDtoAwareParamDecorator(ParamType.BODY);
export const Query = createDtoAwareParamDecorator(ParamType.QUERY);
export const Headers = createParamDecorator(ParamType.HEADERS);
export const Req = createParamDecorator(ParamType.REQ);
