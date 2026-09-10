import { ICompany } from "../../../domain/company";
import { IOrder, IOrderItem } from "../../../domain/order";
import { IOrderEntity } from "../../entities";

export interface IOrderMapper {
  toDomain(data: IOrderEntity, company: ICompany, items: IOrderItem[]): IOrder;
}
