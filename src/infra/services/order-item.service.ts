import { IOrderItemEntity } from "../../entities";
import { IOrderItem } from "../../domain/order";
import { IProduct } from "../../domain/product";
import { IOrderItemMapper } from "../mappers/order-item.mapper";
import { IOrderItemService } from "./order-item.interface";

export class OrderItemService implements IOrderItemService {
  constructor(private readonly orderItemMapper: IOrderItemMapper) {}

  handle(list: IOrderItemEntity[], products: IProduct[]): IOrderItem[] {
    return list.map((item) => this.makeOrderItem(item, products));
  }

  private makeOrderItem(
    item: IOrderItemEntity,
    products: IProduct[],
  ): IOrderItem {
    const productFound = products.find(
      (product) => product.getId() === item.productId,
    );

    if (!productFound) {
      throw new Error(`product ${item.productId} not found`);
    }

    return this.orderItemMapper.toDomain(item, productFound);
  }
}
