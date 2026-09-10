import { IOrderItem, IProduct } from "../../../domain";
import { IOrderItemEntity } from "../../entities";
export interface IOrderItemService {
  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[];
}
