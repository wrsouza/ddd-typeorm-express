import { Module } from "../../core";
import { ProductModule as ProductInfraModule } from "../../infra/modules";
import { ProductService } from "../services";

@Module({
  imports: [ProductInfraModule],
  providers: [
    {
      provide: "PRODUCT_APPLICATION_SERVICE",
      useClass: ProductService,
    },
  ],
  exports: ["PRODUCT_APPLICATION_SERVICE"],
})
export class ProductModule {}
