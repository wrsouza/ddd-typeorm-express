import "reflect-metadata";
import { CONTROLLER_METADATA } from "../constants";

export function Controller(prefix = ""): ClassDecorator {
  return (target) => {
    const normalized = prefix.startsWith("/") ? prefix : `/${prefix}`;
    Reflect.defineMetadata(
      CONTROLLER_METADATA,
      { prefix: normalized.replace(/\/$/, "") },
      target,
    );
  };
}
