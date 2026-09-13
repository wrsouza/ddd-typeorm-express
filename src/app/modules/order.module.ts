import { Module } from "../../core";
import {
  CompanyModule as CompanyInfraModule,
  OrderModule as OrderInfraModule,
} from "../../infra/modules";
import { OrderController } from "../controllers";
import { OrderService } from "../services";

@Module({
  imports: [OrderInfraModule, CompanyInfraModule],
  controllers: [OrderController],
  providers: [
    {
      provide: "ORDER_SERVICE",
      useClass: OrderService,
    },
  ],
})
export class OrderModule {}
