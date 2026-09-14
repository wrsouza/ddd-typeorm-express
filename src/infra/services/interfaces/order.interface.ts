import { ICompany, IOrder } from "../../../domain";
import { IOrderFilter } from "../../repositories";

export interface IOrderService {
  paginate(
    filters: IOrderFilter,
    company: ICompany,
  ): Promise<[IOrder[], number]>;
  getAll(company: ICompany): Promise<IOrder[]>;
  create(company: ICompany): Promise<IOrder>;
}
