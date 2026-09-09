import { IOrderItemEntity } from "../../entities";
import { IProduct } from "../../domain/product";
import { IOrderItem } from "../../domain/order";

export interface IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem;
}
