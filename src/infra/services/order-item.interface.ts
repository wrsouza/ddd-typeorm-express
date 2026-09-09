import { IOrderItemEntity } from "../../entities";
import { IProduct, IOrderItem } from "../../domain";
export interface IOrderItemService {
  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[];
}
