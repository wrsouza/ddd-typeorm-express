import { IProduct } from "../../product/product.interface";
import { IOrderItem, IOrderItemData } from "./order-item.interface";

export class OrderItem implements IOrderItem {
  private id: string;
  private product: IProduct;
  private price: number;
  private quantity: number;

  constructor(data: IOrderItemData) {
    if (!data.id) {
      throw new Error("order item id is required");
    }
    if (data.quantity <= 0) {
      throw new Error("order item quantity must be greater than zero");
    }
    if (data.price < 0) {
      throw new Error("order item price cannot be negative");
    }

    this.id = data.id;
    this.product = data.product;
    this.price = data.price;
    this.quantity = data.quantity;
  }

  getId(): string {
    return this.id;
  }

  getProduct(): IProduct {
    return this.product;
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
}
