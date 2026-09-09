import { ICompany } from "../company";
import { IOrderItem } from "./order-item";

export interface IOrderData {
  id: string;
  name: string;
  company: ICompany;
  items: IOrderItem[];
}

export interface IOrder {
  getId(): string;
  getName(): string;
  getCompany(): ICompany;
  getItems(): IOrderItem[];
  getTotalQuantity(): number;
  getTotalValue(): number;
}

export interface IOrderService {
  getAll(company: ICompany): Promise<IOrder[]>;
}
