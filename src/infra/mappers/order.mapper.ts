import { ICompany } from "../../domain/company";
import { IOrder, IOrderItem, Order } from "../../domain/order";
import { IOrderEntity } from "../entities";
import { IOrderMapper } from "./interfaces/order.interface";

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
