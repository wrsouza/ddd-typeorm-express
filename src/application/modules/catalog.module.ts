import { Module } from "../../core";
import { CatalogModule as CatalogInfraModule } from "../../infra/modules";
import { CatalogService } from "../services";
import { CompanyModule } from "./company.module";
import { ProductModule } from "./product.module";

@Module({
  imports: [CatalogInfraModule, CompanyModule, ProductModule],
  providers: [
    {
      provide: "CATALOG_APPLICATION_SERVICE",
      useClass: CatalogService,
    },
  ],
  exports: ["CATALOG_APPLICATION_SERVICE"],
})
export class CatalogModule {}
