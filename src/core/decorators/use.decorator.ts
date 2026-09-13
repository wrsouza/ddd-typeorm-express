import { GUARDS_METADATA } from "../constants";

function createUseDecorator(metadataKey: symbol) {
  return (...items: any[]): ClassDecorator & MethodDecorator => {
    return ((
      target: any,
      propertyKey?: string | symbol,
      descriptor?: PropertyDescriptor,
    ) => {
      if (propertyKey) {
        // uso em método: @Get() @UseGuards(AuthGuard) findOne() {...}
        const existing =
          Reflect.getMetadata(metadataKey, target.constructor, propertyKey) ||
          [];
        Reflect.defineMetadata(
          metadataKey,
          [...existing, ...items],
          target.constructor,
          propertyKey,
        );
        return descriptor;
      }
      // uso na classe: @UseGuards(AuthGuard) @Controller('users') export class UsersController {}
      const existing = Reflect.getMetadata(metadataKey, target) || [];
      Reflect.defineMetadata(metadataKey, [...existing, ...items], target);
    }) as ClassDecorator & MethodDecorator;
  };
}

export const UseGuards = createUseDecorator(GUARDS_METADATA);
