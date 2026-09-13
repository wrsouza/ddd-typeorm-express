import { database } from "../../config";
import { Module } from "../../core";
import { OrderEntity } from "../entities";
import { OrderMapper } from "../mappers";
import { OrderRepository } from "../repositories";
import { OrderService } from "../services";
import { OrderItemModule } from "./order-item.module";
import { ProductModule } from "./product.module";

@Module({
  imports: [OrderItemModule, ProductModule],
  providers: [
    {
      provide: "ORDER",
      useValue: database.getRepository(OrderEntity),
    },
    {
      provide: "ORDER_INFRA_SERVICE",
      useClass: OrderService,
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
  exports: ["ORDER_INFRA_SERVICE"],
})
export class OrderModule {}
