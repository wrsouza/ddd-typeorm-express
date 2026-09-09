import { ICompany } from "../../domain/company";
import { IOrder } from "../../domain/order";

export interface IOrderService {
  getAll(company: ICompany): Promise<IOrder[]>;
}
