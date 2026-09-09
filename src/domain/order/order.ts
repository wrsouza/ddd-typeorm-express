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
      throw new Error("order id is required");
    }
    if (!data.name) {
      throw new Error("order name is required");
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
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
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
