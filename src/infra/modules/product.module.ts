import { database } from "../../config";
import { Module } from "../../core";
import { ProductEntity } from "../entities";
import { ProductMapper } from "../mappers";
import { ProductRepository } from "../repositories";
import { ProductService } from "../services";

@Module({
  providers: [
    {
      provide: "PRODUCT",
      useValue: database.getRepository(ProductEntity),
    },
    {
      provide: "PRODUCT_INFRA_SERVICE",
      useClass: ProductService,
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
  exports: ["PRODUCT_INFRA_SERVICE"],
})
export class ProductModule {}
