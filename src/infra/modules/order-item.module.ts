import { Module } from "../../core";
import { OrderItemMapper } from "../mappers";
import { OrderItemService } from "../services";

@Module({
  providers: [
    {
      provide: "ORDER_ITEM_INFRA_SERVICE",
      useClass: OrderItemService,
    },
    {
      provide: "ORDER_ITEM_MAPPER",
      useClass: OrderItemMapper,
    },
  ],
  exports: ["ORDER_ITEM_INFRA_SERVICE"],
})
export class OrderItemModule {}
