import { BadRequestException, NotFoundException } from "../../common/exceptions";
import { Money } from "../shared";
import { ICompany } from "../company";
import { IOrderItem } from "./order-item";
import { IOrder, IOrderData, IOrderJson } from "./order.interface";

export class Order implements IOrder {
  private id: string;
  private name: string;
  private company: ICompany;
  private items: IOrderItem[];

  constructor(data: IOrderData) {
    if (!data.id) {
      throw new BadRequestException("order id is required");
    }
    if (!data.name) {
      throw new BadRequestException("order name is required");
    }
    if (!data.company) {
      throw new BadRequestException("order company is required");
    }
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.items = data.items;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCompany(): ICompany {
    return this.company;
  }

  getItems(): IOrderItem[] {
    return [...this.items];
  }

  addItem(item: IOrderItem): void {
    if (this.items.some((existing) => existing.getId() === item.getId())) {
      throw new BadRequestException(
        `order already has an item with id "${item.getId()}"`,
      );
    }
    if (item.getProduct().getCatalogId() !== this.company.getCatalogId()) {
      throw new BadRequestException(
        "order item product must belong to the order company's catalog",
      );
    }
    const currency = this.items[0]?.getProduct().getCurrency();
    if (currency && item.getProduct().getCurrency() !== currency) {
      throw new BadRequestException(
        "order item currency must match the other items in the order",
      );
    }
    this.items.push(item);
  }

  removeItem(itemId: string): void {
    const index = this.items.findIndex((item) => item.getId() === itemId);
    if (index === -1) {
      throw new NotFoundException(`order item "${itemId}" not found`);
    }
    this.items.splice(index, 1);
  }

  getTotalValue(): number {
    if (this.items.length === 0) {
      return 0;
    }
    const currency = this.items[0].getProduct().getCurrency();
    const total = this.items.reduce(
      (acc, item) => acc.add(new Money(item.getTotal(), currency)),
      new Money(0, currency),
    );
    return total.getAmount();
  }

  getTotalQuantity(): number {
    return this.items.reduce((total, item) => total + item.getQuantity(), 0);
  }

  toJson(): IOrderJson {
    return {
      id: this.id,
      name: this.name,
      company: this.company.toJson(),
      items: this.items.map((item) => item.toJson()),
      totalItems: this.items.length,
      totalValue: this.getTotalValue(),
      totalQuantity: this.getTotalQuantity(),
    };
  }
}
