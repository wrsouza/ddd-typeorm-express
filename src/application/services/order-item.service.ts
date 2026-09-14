import { Inject, Injectable } from "../../core";
import { IOrderItem, IProduct } from "../../domain";
import { IOrderItemEntity } from "../../infra/entities";
import { IOrderItemMapper } from "../../infra/mappers";
import { IOrderItemService } from "./interfaces";

@Injectable()
export class OrderItemService implements IOrderItemService {
  constructor(
    @Inject("ORDER_ITEM_MAPPER")
    private readonly orderItemMapper: IOrderItemMapper,
  ) {}

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
