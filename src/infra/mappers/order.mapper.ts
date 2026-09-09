import { IOrderEntity } from "../../entities";
import { ICompany } from "../../domain/company";
import { IOrder, IOrderItem, Order } from "../../domain/order";

export interface IOrderMapper {
  toDomain(data: IOrderEntity, company: ICompany, items: IOrderItem[]): IOrder;
}

export class OrderMapper implements IOrderMapper {
  toDomain(data: IOrderEntity, company: ICompany, items: IOrderItem[]): IOrder {
    return new Order({
      id: data.id,
      name: data.name,
      company,
      items,
    });
  }
}
