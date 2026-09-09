import { IOrderItemEntity } from "../../entities";
import { IProduct } from "../../domain/product";
import { IOrderItem, OrderItem } from "../../domain/order";

export interface IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem;
}

export class OrderItemMapper implements IOrderItemMapper {
  toDomain(data: IOrderItemEntity, product: IProduct): IOrderItem {
    return new OrderItem({
      id: data.id,
      quantity: data.quantity,
      price: product.getPrice(),
      product,
    });
  }
}
