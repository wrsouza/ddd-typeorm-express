import { ICompanyService } from "../../domain/company";
import { IOrderService } from "../../domain/order";
import { OrderResultDto } from "./dtos";

export class OrdersService {
  constructor(
    private readonly companyService: ICompanyService,
    private readonly orderService: IOrderService,
  ) {}

  async getAll(companyId: string): Promise<OrderResultDto[]> {
    const company = await this.companyService.getById(companyId);
    const orders = await this.orderService.getAll(company);
    return orders.map((order) => new OrderResultDto(order.toJson()));
  }
}
