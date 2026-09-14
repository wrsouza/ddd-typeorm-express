import { BadRequestException } from "../../../common/exceptions";
import { Money } from "../../shared";
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
  private price: Money | null;
  private quantity: number;

  constructor(data: IOrderItemData) {
    if (!data.id) {
      throw new BadRequestException("order item id is required");
    }
    if (!data.product) {
      throw new BadRequestException("order item product is required");
    }
    if (data.quantity <= 0) {
      throw new BadRequestException("order item quantity must be greater than zero");
    }
    this.id = data.id;
    this.product = data.product;
    this.discount = data.discount;
    this.price =
      data.price !== null ? new Money(data.price, data.product.getCurrency()) : null;
    this.quantity = data.quantity;
  }

  getId(): string {
    return this.id;
  }

  getProduct(): IProduct {
    return this.product;
  }

  private getPriceMoney(): Money {
    return this.price ?? new Money(this.product.getPrice(), this.product.getCurrency());
  }

  getPrice(): number {
    return this.getPriceMoney().getAmount();
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
    const priceMoney = this.getPriceMoney();
    const subtotal = priceMoney.multiply(this.quantity);
    const discountMoney = new Money(this.getDiscount(), priceMoney.getCurrency());
    return subtotal.subtract(discountMoney).getAmount();
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
