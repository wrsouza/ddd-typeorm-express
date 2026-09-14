import { BadRequestException } from "../../common/exceptions";
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
    return this.items;
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
