import { IOrderItemEntity } from "../../entities";
import { IOrderItem } from "../../domain/order";
import { IProduct } from "../../domain/product";

export interface IOrderItemService {
  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[];
}
