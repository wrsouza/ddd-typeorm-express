import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from "../../core";
import {
  OrderCreateDto,
  OrderCreateResultDto,
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
  OrderUpdateDto,
  OrderUpdateResultDto,
} from "../dtos";
import { IOrderService } from "../services";

@Controller("orders")
export class OrderController {
  constructor(
    @Inject("ORDER_SERVICE")
    private readonly service: IOrderService,
  ) {}

  @Get()
  async paginate(
    @Query() params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    return this.service.paginate(params);
  }

  @Post()
  async create(@Body() body: OrderCreateDto): Promise<OrderCreateResultDto> {
    return this.service.create(body);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<OrderResultDto> {
    return this.service.findById(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: OrderUpdateDto,
  ): Promise<OrderUpdateResultDto> {
    return this.service.update(id, body);
  }
}
