import { Module } from "../../core";
import {
  CompanyModule as CompanyInfraModule,
  OrderModule as OrderInfraModule,
} from "../../infra/modules";
import { OrderController } from "../controllers";
import { OrderService, OrderFilterService } from "../services";
@Module({
  imports: [OrderInfraModule, CompanyInfraModule],
  controllers: [OrderController],
  providers: [
    {
      provide: "ORDER_SERVICE",
      useClass: OrderService,
    },
    {
      provide: "ORDER_FILTER",
      useClass: OrderFilterService,
    },
  ],
})
export class OrderModule {}
