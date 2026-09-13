import { Inject, Injectable } from "../../../core";
import {
  ICompanyService as ICompanyInfraService,
  IOrderService as IOrderInfraService,
} from "../../../infra/services";
import {
  OrderCreateDto,
  OrderCreateResultDto,
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
  OrderUpdateDto,
  OrderUpdateResultDto,
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

  async paginate(params: OrderPaginateDto): Promise<OrderPaginateResultDto> {
    const company = await this.companyService.getById(
      "1e271859-2a39-4e02-9f10-559d109a64a1",
    );
    const orders = await this.orderService.getAll(company);
    return orders.map((order) => order.toJson());
  }

  async create(body: OrderCreateDto): Promise<OrderCreateResultDto> {
    throw new Error("method not implemented");
  }

  async findById(id: string): Promise<OrderResultDto> {
    throw new Error("method not implemented");
  }

  async update(
    id: string,
    body: OrderUpdateDto,
  ): Promise<OrderUpdateResultDto> {
    throw new Error("method not implemented");
  }
}
