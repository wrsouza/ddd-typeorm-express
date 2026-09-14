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
import { IOrderService } from "./order.interface";

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject("COMPANY_INFRA_SERVICE")
    private readonly companyService: ICompanyInfraService,
    @Inject("ORDER_INFRA_SERVICE")
    private readonly orderService: IOrderInfraService,
  ) {}

  async getAll(
    employeeId: string,
    params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto> {
    const company = await this.companyService.findByEmployeeId(employeeId);
    const orders = await this.orderService.getAll(company);
    return orders.map((order) => order.toJson());
  }

  async findById(id: string): Promise<OrderResultDto> {
    throw new Error("method not implemented");
  }
}
