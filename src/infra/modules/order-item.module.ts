import { database } from "../../config";
import { Module } from "../../core";
import { OrderItemEntity } from "../entities";
import { OrderItemMapper } from "../mappers";
import { OrderItemRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "ORDER_ITEM",
      useValue: database.getRepository(OrderItemEntity),
    },
    {
      provide: "ORDER_ITEM_REPOSITORY",
      useFactory: (client) => new OrderItemRepository(client),
      inject: ["ORDER_ITEM"],
    },
    {
      provide: "ORDER_ITEM_MAPPER",
      useClass: OrderItemMapper,
    },
  ],
  exports: ["ORDER_ITEM_REPOSITORY", "ORDER_ITEM_MAPPER"],
})
export class OrderItemModule {}
