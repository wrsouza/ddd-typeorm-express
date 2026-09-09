import { IOrderItem } from "../../../domain/order";
import { ProductResultDto } from "./product-result.dto";

export class OrderItemResultDto {
  readonly id: string;
  readonly product: ProductResultDto;
  readonly price: number;
  readonly quantity: number;
  readonly total: number;

  private constructor(item: IOrderItem) {
    this.id = item.getId();
    this.product = ProductResultDto.fromDomain(item.getProduct());
    this.price = item.getPrice();
    this.quantity = item.getQuantity();
    this.total = item.getTotal();
  }

  static fromDomain(item: IOrderItem): OrderItemResultDto {
    return new OrderItemResultDto(item);
  }
}
