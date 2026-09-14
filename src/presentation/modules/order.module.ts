import { Module } from "../../core";
import {
  CompanyModule as CompanyApplicationModule,
  OrderModule as OrderApplicationModule,
} from "../../application/modules";
import { OrderController } from "../controllers";
import { OrderFacade, OrderFilterService } from "../facades";
@Module({
  imports: [OrderApplicationModule, CompanyApplicationModule],
  controllers: [OrderController],
  providers: [
    {
      provide: "ORDER_FACADE",
      useClass: OrderFacade,
    },
    {
      provide: "ORDER_FILTER",
      useClass: OrderFilterService,
    },
  ],
})
export class OrderModule {}
