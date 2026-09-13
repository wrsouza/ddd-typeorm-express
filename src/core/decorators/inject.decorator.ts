import "reflect-metadata";
import { INJECT_METADATA, type InjectionToken } from "../constants";

export function Inject(token: InjectionToken): ParameterDecorator {
  return (target, _propertyKey, index) => {
    const existing: Record<number, InjectionToken> =
      Reflect.getMetadata(INJECT_METADATA, target) || {};
    existing[index] = token;
    Reflect.defineMetadata(INJECT_METADATA, existing, target);
  };
}
