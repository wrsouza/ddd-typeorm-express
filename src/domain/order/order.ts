import { ICompany } from "../company";
import { IOrderItem } from "../order-item";
import { IOrder, IOrderData, IOrderJson } from "./order.interface";

export class Order implements IOrder {
  private id: string;
  private name: string;
  private company: ICompany;
  private items: IOrderItem[];

  constructor(data: IOrderData) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.items = data.items;
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
      totalQuantity: this.getTotalQuantity(),
      totalValue: this.getTotalValue(),
    };
  }
}
