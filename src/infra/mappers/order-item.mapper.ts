import { IOrderItem, OrderItem } from "../../domain/order";
import { IProduct } from "../../domain/product";
import { IOrderItemEntity } from "../entities";
import { IOrderItemMapper } from "./interfaces/order-item.interface";

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
