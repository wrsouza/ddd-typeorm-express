import { Inject, Injectable } from "../../../core";
import {
  ICompanyService as ICompanyInfraService,
  IOrderService as IOrderInfraService,
} from "../../../infra/services";
import {
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../../dtos";
import { IOrderFilterService } from "./order-filter.interface";
import { IOrderService } from "./order.interface";

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject("COMPANY_INFRA_SERVICE")
    private readonly companyService: ICompanyInfraService,
    @Inject("ORDER_INFRA_SERVICE")
    private readonly orderService: IOrderInfraService,
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
    throw new Error("method not implemented");
  }
}
