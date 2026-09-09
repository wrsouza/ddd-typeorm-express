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
    if (!company) {
      throw new Error(`company ${companyId} not found`);
    }
    const orders = await this.orderService.getAll(company);
    return orders.map((order) => OrderResultDto.fromDomain(order));
  }
}
