import { database } from "../../config";
import { Module } from "../../core";
import { CatalogEntity } from "../entities";
import { CatalogMapper } from "../mappers";
import { CatalogRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "CATALOG",
      useValue: database.getRepository(CatalogEntity),
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
  exports: ["CATALOG_REPOSITORY", "CATALOG_MAPPER"],
})
export class CatalogModule {}
