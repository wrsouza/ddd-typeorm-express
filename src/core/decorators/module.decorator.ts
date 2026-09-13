import "reflect-metadata";
import { MODULE_METADATA, ModuleOptions } from "../constants";

export function Module(options: ModuleOptions = {}): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MODULE_METADATA, options, target);
  };
}
