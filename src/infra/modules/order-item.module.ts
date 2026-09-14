import { Module } from "../../core";
import { OrderItemMapper } from "../mappers";

@Module({
  providers: [
    {
      provide: "ORDER_ITEM_MAPPER",
      useClass: OrderItemMapper,
    },
  ],
  exports: ["ORDER_ITEM_MAPPER"],
})
export class OrderItemModule {}
