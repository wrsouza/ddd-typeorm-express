import { database } from "../../config";
import { Module } from "../../core";
import { ProductEntity } from "../entities";
import { ProductMapper } from "../mappers";
import { ProductRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "PRODUCT",
      useValue: database.getRepository(ProductEntity),
    },
    {
      provide: "PRODUCT_REPOSITORY",
      useFactory: (client) => new ProductRepository(client),
      inject: ["PRODUCT"],
    },
    {
      provide: "PRODUCT_MAPPER",
      useClass: ProductMapper,
    },
  ],
  exports: ["PRODUCT_REPOSITORY", "PRODUCT_MAPPER"],
})
export class ProductModule {}
