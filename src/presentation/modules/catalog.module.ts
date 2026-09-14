import { Module } from "../../core";
import { CatalogModule as CatalogApplicationModule } from "../../application/modules";
import { CatalogController } from "../controllers";
import { CatalogFilterService, CatalogFacade } from "../facades/catalog";

@Module({
  imports: [CatalogApplicationModule],
  controllers: [CatalogController],
  providers: [
    {
      provide: "CATALOG_FACADE",
      useClass: CatalogFacade,
    },
    {
      provide: "CATALOG_FILTER",
      useClass: CatalogFilterService,
    },
  ],
})
export class CatalogModule {}
