import { IOrderJson } from "../../../domain/order";
import { IOrderItemJson } from "../../../domain/order-item";

export class OrderResultDto {
  readonly id: string;
  readonly name: string;
  readonly items: IOrderItemJson[];
  readonly totalQuantity: number;
  readonly totalValue: number;

  constructor(data: IOrderJson) {
    this.id = data.id;
    this.name = data.name;
    this.items = data.items;
    this.totalQuantity = data.totalQuantity;
    this.totalValue = data.totalValue;
  }
}
