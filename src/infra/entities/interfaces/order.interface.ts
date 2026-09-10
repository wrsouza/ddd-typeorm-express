import { IOrderItemEntity } from "./order-item.interface";

export interface IOrderEntity {
  id: string;
  name: string;
  companyId: string;
  items: IOrderItemEntity[];
}
