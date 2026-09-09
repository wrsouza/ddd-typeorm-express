import { IOrderEntity } from "../../entities";
import { ICompany } from "../company";
import { IOrderItem } from "../order-item";
import { Order } from "./order";
import { IOrder, IOrderMapper } from "./order.interface";

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
