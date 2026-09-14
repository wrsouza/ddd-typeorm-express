import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "../../core";
import {
  OrderItemCreateDto,
  orderItemCreateSchema,
  OrderPaginateDto,
  orderPaginateSchema,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../dtos";
import { AuthGuard } from "../guards";
import { IOrderFacade } from "../facades";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "../decorators";
import { dataEnvelopeSchema, paginateEnvelopeSchema } from "../swagger";

@ApiTags("Orders")
@ApiBearerAuth()
@Controller("orders")
@UseGuards(AuthGuard)
export class OrderController {
  constructor(
    @Inject("ORDER_FACADE")
    private readonly facade: IOrderFacade,
  ) {}

  @Get()
  @ApiOperation({ summary: "List the current employee's company orders" })
  @ApiQuery({ schema: orderPaginateSchema })
  @ApiResponse({
    status: 200,
    description: "Paginated order list",
    schema: paginateEnvelopeSchema,
  })
  async paginate(
    @Req("employeeId") employeeId: string,
    @Query() params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    return this.facade.paginate(employeeId, params);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an order by id" })
  @ApiResponse({
    status: 200,
    description: "Order",
    schema: dataEnvelopeSchema,
  })
  async show(
    @Req("employeeId") employeeId: string,
    @Param("id") orderId: string,
  ): Promise<OrderResultDto> {
    return this.facade.findById(employeeId, orderId);
  }

  @Post(":id/items")
  @ApiOperation({ summary: "Add an item to an existing order" })
  @ApiBody({ schema: orderItemCreateSchema })
  @ApiResponse({
    status: 200,
    description: "Order with the item added",
    schema: dataEnvelopeSchema,
  })
  async addItem(
    @Req("employeeId") employeeId: string,
    @Param("id") orderId: string,
    @Body() data: OrderItemCreateDto,
  ): Promise<OrderResultDto> {
    return this.facade.addItem(employeeId, orderId, data);
  }
}
