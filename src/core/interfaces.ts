import type { Request } from "express";
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

/**
 * GUARD
 */
export class ExecutionContext {
  constructor(
    private readonly request: Request,
    private readonly controllerClass: any,
    private readonly handlerName: string | symbol,
    private readonly routeParams: Record<string, string>,
  ) {}

  getRequest(): Request {
    return this.request;
  }

  getParams(): Record<string, string> {
    return this.routeParams;
  }

  getClass(): any {
    return this.controllerClass;
  }

  getHandler(): string | symbol {
    return this.handlerName;
  }
}

/** Mesmo contrato do CanActivate do @nestjs/common. */
export interface CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
