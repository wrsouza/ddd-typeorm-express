import { IOrderItem } from "../../../domain/order";
import { IProduct } from "../../../domain/product";
import { IOrderItemEntity } from "../../entities";

export interface IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem;
}
