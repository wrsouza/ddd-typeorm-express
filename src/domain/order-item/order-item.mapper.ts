import { IOrderItemEntity } from "../../entities";
import { IProduct } from "../product/product.interface";
import { OrderItem } from "./order-item";
import { IOrderItem, IOrderItemMapper } from "./order-item.interface";

export class OrderItemMapper implements IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem {
    return new OrderItem({
      id: data.id,
      quantity: data.quantity,
      product,
    });
  }
}
