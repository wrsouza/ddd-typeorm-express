import "reflect-metadata";

import { INJECTABLE_METADATA } from "../constants";

export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE_METADATA, true, target);
  };
}
