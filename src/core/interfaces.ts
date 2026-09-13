import type { ZodType } from "zod";

export interface ArgumentMetadata {
  type: "param" | "body" | "query" | "headers";
  data?: string;
  /**
   * Classe de DTO ou schema Zod passado em @Body(Dto|schema)/@Query(Dto|schema),
   * quando houver — mesmo papel do metatype do Nest.
   */
  metatype?: { new (...args: any[]): any } | ZodType;
}

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>;
}

export type ClassOrInstance<T> = T | { new (...args: any[]): T };
