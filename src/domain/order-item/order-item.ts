import { IProduct } from "../product/product.interface";
import {
  IOrderItem,
  IOrderItemData,
  IOrderItemJson,
} from "./order-item.interface";

export class OrderItem implements IOrderItem {
  private id: string;
  private product: IProduct;
  private price: number;
  private quantity: number;

  constructor(data: IOrderItemData) {
    this.id = data.id;
    this.product = data.product;
    this.price = data.price;
    this.quantity = data.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getTotal(): number {
    return this.quantity * this.price;
  }

  toJson(): IOrderItemJson {
    return {
      id: this.id,
      product: this.product.toJson(),
      price: this.price,
      quantity: this.quantity,
      total: this.getTotal(),
    };
  }
}
