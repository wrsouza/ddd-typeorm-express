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
import { IOrderFacade } from "../facades";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    @Inject("ORDER_FACADE")
    private readonly facade: IOrderFacade,
  ) {}

  @Get()
  async paginate(
    @Req("employeeId") employeeId: string,
    @Query() params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    return this.facade.paginate(employeeId, params);
  }

  @Get(":id")
  async show(
    @Req("employeeId") employeeId: string,
    @Param("id") orderId: string,
  ): Promise<OrderResultDto> {
    return this.facade.findById(employeeId, orderId);
  }
}
