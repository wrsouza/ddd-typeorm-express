import { database } from "../../config";
import { Module } from "../../core";
import { OrderEntity } from "../entities";
import { OrderMapper } from "../mappers";
import { OrderRepository } from "../repositories";

@Module({
  providers: [
    {
      provide: "ORDER",
      useValue: database.getRepository(OrderEntity),
    },
    {
      provide: "ORDER_REPOSITORY",
      useFactory: (client) => new OrderRepository(client),
      inject: ["ORDER"],
    },
    {
      provide: "ORDER_MAPPER",
      useClass: OrderMapper,
    },
  ],
  exports: ["ORDER_REPOSITORY", "ORDER_MAPPER"],
})
export class OrderModule {}
