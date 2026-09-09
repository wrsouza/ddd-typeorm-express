import { IOrder } from "../../../domain/order";
import { OrderItemResultDto } from "./order-item-result.dto";

export class OrderResultDto {
  readonly id: string;
  readonly name: string;
  readonly items: OrderItemResultDto[];
  readonly totalQuantity: number;
  readonly totalValue: number;

  private constructor(order: IOrder) {
    this.id = order.getId();
    this.name = order.getName();
    this.items = order.getItems().map((item) => OrderItemResultDto.fromDomain(item));
    this.totalQuantity = order.getTotalQuantity();
    this.totalValue = order.getTotalValue();
  }

  static fromDomain(order: IOrder): OrderResultDto {
    return new OrderResultDto(order);
  }
}
