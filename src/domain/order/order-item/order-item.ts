import { IDiscount } from "../../discount";
import { IProduct } from "../../product/product.interface";
import {
  IOrderItem,
  IOrderItemData,
  IOrderItemJson,
} from "./order-item.interface";

export class OrderItem implements IOrderItem {
  private id: string;
  private product: IProduct;
  private discount: IDiscount | null;
  private price: number | null;
  private quantity: number;

  constructor(data: IOrderItemData) {
    this.id = data.id;
    this.product = data.product;
    this.discount = data.discount;
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
    if (!this.price) {
      return this.product.getPrice();
    }
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getDiscount(): number {
    if (!this.discount) {
      return 0;
    }

    return this.discount.getValue(
      this.quantity,
      this.getPrice(),
      this.product.getBoxQuantity(),
    );
  }

  getTotal(): number {
    return this.quantity * this.getPrice() - this.getDiscount();
  }

  toJson(): IOrderItemJson {
    return {
      id: this.id,
      product: this.product.toJson(),
      price: this.getPrice(),
      quantity: this.quantity,
      total: this.getTotal(),
      discount: this.getDiscount(),
    };
  }
}
