import { ICompany, IOrder } from "../../../domain";
export interface IOrderService {
  getAll(company: ICompany): Promise<IOrder[]>;
}
