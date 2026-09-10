import type { IOrderItemJson } from "../../../domain";
import { ProductResultDto } from "./product-result.dto";

export class OrderItemResultDto {
  readonly id: string;
  readonly product: ProductResultDto;
  readonly price: number;
  readonly quantity: number;
  readonly total: number;

  constructor(data: IOrderItemJson) {
    this.id = data.id;
    this.product = new ProductResultDto(data.product);
    this.price = data.price;
    this.quantity = data.quantity;
    this.total = data.total;
  }
}
