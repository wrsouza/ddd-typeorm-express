import { ICompanyService, IOrderService } from "../../infra/services";
import { OrderResultDto } from "./dtos";

export class OrdersUseCase {
  constructor(
    private readonly companyService: ICompanyService,
    private readonly orderService: IOrderService,
  ) {}

  async getAll(companyId: string): Promise<OrderResultDto[]> {
    const company = await this.companyService.getById(companyId);
    if (!company) {
      throw new Error(`company ${companyId} not found`);
    }

    const orders = await this.orderService.getAll(company);
    return orders.map((order) => new OrderResultDto(order.toJson()));
  }
}
