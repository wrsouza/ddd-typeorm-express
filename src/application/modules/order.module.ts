import { Module } from "../../core";
import { OrderModule as OrderInfraModule } from "../../infra/modules";
import { OrderService } from "../services";
import { OrderItemModule } from "./order-item.module";
import { ProductModule } from "./product.module";

@Module({
  imports: [OrderInfraModule, OrderItemModule, ProductModule],
  providers: [
    {
      provide: "ORDER_APPLICATION_SERVICE",
      useClass: OrderService,
    },
  ],
  exports: ["ORDER_APPLICATION_SERVICE"],
})
export class OrderModule {}
