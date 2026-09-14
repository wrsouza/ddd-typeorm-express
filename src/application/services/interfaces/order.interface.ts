import { ICompany, IOrder } from "../../../domain";
import { IOrderFilter } from "../../../infra/repositories";

export interface IOrderAddItemData {
  productId: string;
  quantity: number;
}

export interface IOrderApplicationService {
  paginate(
    filters: IOrderFilter,
    company: ICompany,
  ): Promise<[IOrder[], number]>;
  getAll(company: ICompany): Promise<IOrder[]>;
  getById(id: string, company: ICompany): Promise<IOrder>;
  create(company: ICompany): Promise<IOrder>;
  addItem(
    orderId: string,
    company: ICompany,
    data: IOrderAddItemData,
  ): Promise<IOrder>;
}
