import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Req,
  UseGuards,
} from "../../core";
import {
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../dtos";
import { AuthGuard } from "../guards";
import { IOrderService } from "../services";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    @Inject("ORDER_SERVICE")
    private readonly service: IOrderService,
  ) {}

  @Get()
  async getAll(
    @Req("employeeId") employeeId: string,
    @Query() params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    return this.service.getAll(employeeId, params);
  }

  @Get(":id")
  async show(
    @Req("employeeId") employeeId: string,
    @Param("id") orderId: string,
  ): Promise<OrderResultDto> {
    return this.service.findById(employeeId, orderId);
  }
}
