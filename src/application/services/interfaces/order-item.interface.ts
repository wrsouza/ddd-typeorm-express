import { IOrderItem, IProduct } from "../../../domain";
import { IOrderItemEntity } from "../../../infra/entities";

export interface IOrderItemService {
  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[];
}
