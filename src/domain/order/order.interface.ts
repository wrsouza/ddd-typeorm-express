import { ICompany, ICompanyJson } from "../company";
import { IOrderItem, IOrderItemJson } from "./order-item";

export interface IOrderData {
  id: string;
  name: string;
  company: ICompany;
  items: IOrderItem[];
}

export interface IOrderJson {
  id: string;
  name: string;
  company: ICompanyJson;
  items: IOrderItemJson[];
  totalItems: number;
  totalValue: number;
  totalQuantity: number;
}

export interface IOrder {
  getId(): string;
  getName(): string;
  getCompany(): ICompany;
  getItems(): IOrderItem[];
  addItem(item: IOrderItem): void;
  removeItem(itemId: string): void;
  getTotalQuantity(): number;
  getTotalValue(): number;
  toJson(): IOrderJson;
}
