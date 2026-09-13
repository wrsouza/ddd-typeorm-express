import type { ZodType } from "zod";
/**
 * CONTROLLER
 */
export const CONTROLLER_METADATA = Symbol.for("controller:metadata");

/**
 * ROUTES METHODS
 */
export const ROUTES_METADATA = Symbol.for("controller:routes");
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RouteDefinitionMeta {
  method: HttpMethod;
  path: string;
  handlerName: string | symbol;
}

/**
 * HTTP PARAMS (BODY, QUERY, PARAM, HEADERS, REQ )
 */
export const PARAMS_METADATA = Symbol.for("route:params");

export enum ParamType {
  PARAM = "PARAM",
  BODY = "BODY",
  QUERY = "QUERY",
  HEADERS = "HEADERS",
  REQ = "REQ",
}

export interface ParamMeta {
  index: number;
  type: ParamType;
  key?: string;
  dtoType?: Type<any> | ZodType;
  pipes?: any[];
}
export type Type<T = any> = { new (...args: any[]): T };

/**
 * INJECTABLE / PROVIDERS
 */
export const INJECTABLE_METADATA = Symbol.for("injectable:metadata");

/**
 * INJECT (explicit token override for constructor params)
 */
export const INJECT_METADATA = Symbol.for("inject:metadata");

/**
 * MODULE
 */
export const MODULE_METADATA = Symbol.for("module:metadata");

export interface DynamicModule extends ModuleOptions {
  module: Type<any>;
}

export type ModuleImport = Type<any> | DynamicModule;
export type InjectionToken = Type<any> | string | symbol;
export type ClassShorthandProvider = Type<any>;

export interface ClassProvider {
  provide: InjectionToken;
  useClass: Type<any>;
}

export interface ValueProvider {
  provide: InjectionToken;
  useValue: any;
}

export interface FactoryProvider {
  provide: InjectionToken;
  useFactory: (...args: any[]) => any;
  inject?: InjectionToken[];
}

export interface ExistingProvider {
  provide: InjectionToken;
  useExisting: InjectionToken;
}

export type Provider =
  | ClassShorthandProvider
  | ClassProvider
  | ValueProvider
  | FactoryProvider
  | ExistingProvider;

export interface ModuleOptions {
  imports?: ModuleImport[];
  controllers?: Type<any>[];
  providers?: Provider[];
  exports?: InjectionToken[];
  global?: boolean;
}

/**
 * GUARDS
 */
export const GUARDS_METADATA = Symbol.for("guards:metadata");
