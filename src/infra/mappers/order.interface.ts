import { IOrderEntity } from "../../entities";
import { ICompany } from "../../domain/company";
import { IOrder, IOrderItem } from "../../domain/order";

export interface IOrderMapper {
  toDomain(data: IOrderEntity, company: ICompany, items: IOrderItem[]): IOrder;
}
