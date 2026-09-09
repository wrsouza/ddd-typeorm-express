import { IOrderEntity } from "../../entities";
import { ICompany, ICompanyJson } from "../company";
import { IOrderItem, IOrderItemJson } from "../order-item";

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
  totalQuantity: number;
  totalValue: number;
}

export interface IOrder {
  getTotalQuantity(): number;
  getTotalValue(): number;
  toJson(): IOrderJson;
}

export interface IOrderMapper {
  toDomain(data: IOrderEntity, company: ICompany, items: IOrderItem[]): IOrder;
}

export interface IOrderService {
  getAll(company: ICompany): Promise<IOrder[]>;
}
