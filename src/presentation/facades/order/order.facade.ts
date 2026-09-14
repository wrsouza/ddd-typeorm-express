import { Inject, Injectable } from "../../../core";
import {
  ICompanyApplicationService,
  IOrderApplicationService,
} from "../../../application/services";
import {
  OrderItemCreateDto,
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../../dtos";
import { IOrderFilterService } from "./order-filter.interface";
import { IOrderFacade } from "./order.interface";

@Injectable()
export class OrderFacade implements IOrderFacade {
  constructor(
    @Inject("COMPANY_APPLICATION_SERVICE")
    private readonly companyService: ICompanyApplicationService,
    @Inject("ORDER_APPLICATION_SERVICE")
    private readonly orderService: IOrderApplicationService,
    @Inject("ORDER_FILTER")
    private readonly filterService: IOrderFilterService,
  ) {}

  async paginate(
    employeeId: string,
    params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    const company = await this.companyService.findByEmployeeId(employeeId);
    const filters = this.filterService.getFilter(params);
    const [orders, total] = await this.orderService.paginate(filters, company);
    return new OrderPaginateResultDto(
      orders.map((order) => order.toJson()),
      filters,
      total,
    );
  }

  async findById(employeeId: string, orderId: string): Promise<OrderResultDto> {
    const company = await this.companyService.findByEmployeeId(employeeId);
    const order = await this.orderService.getById(orderId, company);
    return new OrderResultDto(order.toJson());
  }

  async addItem(
    employeeId: string,
    orderId: string,
    data: OrderItemCreateDto,
  ): Promise<OrderResultDto> {
    const company = await this.companyService.findByEmployeeId(employeeId);
    const order = await this.orderService.addItem(orderId, company, data);
    return new OrderResultDto(order.toJson());
  }
}
