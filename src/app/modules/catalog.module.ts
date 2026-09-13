import { Module } from "../../core";
import { CatalogModule as CatalogInfraModule } from "../../infra/modules";
import { CatalogController } from "../controllers";
import { CatalogFilterService, CatalogService } from "../services/catalog";

@Module({
  imports: [CatalogInfraModule],
  controllers: [CatalogController],
  providers: [
    {
      provide: "CATALOG_SERVICE",
      useClass: CatalogService,
    },
    {
      provide: "CATALOG_FILTER",
      useClass: CatalogFilterService,
    },
  ],
})
export class CatalogModule {}
