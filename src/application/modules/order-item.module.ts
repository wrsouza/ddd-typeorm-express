import { Module } from "../../core";
import { OrderItemModule as OrderItemInfraModule } from "../../infra/modules";
import { OrderItemService } from "../services";

@Module({
  imports: [OrderItemInfraModule],
  providers: [
    {
      provide: "ORDER_ITEM_APPLICATION_SERVICE",
      useClass: OrderItemService,
    },
  ],
  exports: ["ORDER_ITEM_APPLICATION_SERVICE"],
})
export class OrderItemModule {}
