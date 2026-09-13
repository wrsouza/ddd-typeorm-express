import { database } from "../../config";
import { Module } from "../../core";
import { CatalogEntity } from "../entities";
import { CatalogMapper } from "../mappers";
import { CatalogRepository } from "../repositories";
import { CatalogService } from "../services";
import { CompanyModule } from "./company.module";
import { ProductModule } from "./product.module";

@Module({
  imports: [CompanyModule, ProductModule],
  providers: [
    {
      provide: "CATALOG",
      useValue: database.getRepository(CatalogEntity),
    },
    {
      provide: "CATALOG_INFRA_SERVICE",
      useClass: CatalogService,
    },
    {
      provide: "CATALOG_REPOSITORY",
      useFactory: (client) => new CatalogRepository(client),
      inject: ["CATALOG"],
    },
    {
      provide: "CATALOG_MAPPER",
      useClass: CatalogMapper,
    },
  ],
  exports: ["CATALOG_INFRA_SERVICE"],
})
export class CatalogModule {}
