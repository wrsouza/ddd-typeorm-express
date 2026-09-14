import type { IOrderJson } from "../../../domain";
import { OrderCompanyDto } from "./order-company.dto";
import { OrderItemResultDto } from "./order-item-result.dto";

export class OrderResultDto {
  readonly id: string;
  readonly name: string;
  readonly company: OrderCompanyDto;
  readonly items: OrderItemResultDto[];
  readonly totalItems: number;
  readonly totalQuantity: number;
  readonly totalValue: number;

  constructor(data: IOrderJson) {
    this.id = data.id;
    this.name = data.name;
    this.company = new OrderCompanyDto(data.company);
    this.items = data.items.map((item) => new OrderItemResultDto(item));
    this.totalItems = data.totalItems;
    this.totalQuantity = data.totalQuantity;
    this.totalValue = data.totalValue;
  }
}
