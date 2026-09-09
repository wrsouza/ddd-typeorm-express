import { IOrderEntity, IOrderItemEntity } from "../../entities";
import { ICompany } from "../../domain/company";
import { IOrder, IOrderService } from "../../domain/order";
import { IProduct } from "../../domain/product";
import { IOrderMapper } from "../mappers/order.mapper";
import { IOrderRepository } from "../repositories/order.interface";
import { IOrderItemService } from "./order-item.interface";
import { IProductService } from "./product.interface";

export class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly orderMapper: IOrderMapper,
    private readonly orderItemService: IOrderItemService,
    private readonly productService: IProductService,
  ) {}

  async getAll(company: ICompany): Promise<IOrder[]> {
    const orders = await this.orderRepository.getAll();
    const productIds = [
      ...new Set(orders.flatMap((order) => this.getProductIds(order.items))),
    ];
    const products = await this.productService.getByIds(productIds);
    return orders.map((order) => this.makeOrder(order, company, products));
  }

  private getProductIds(items: IOrderItemEntity[]): string[] {
    return [...new Set(items.map((item) => item.productId))];
  }

  private makeOrder(
    data: IOrderEntity,
    company: ICompany,
    products: IProduct[],
  ): IOrder {
    const items = this.orderItemService.handle(data.items, products);
    return this.orderMapper.toDomain(data, company, items);
  }
}
