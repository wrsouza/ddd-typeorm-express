import { v4 as uuid } from "uuid";
import { Inject, Injectable } from "../../core";
import { ICompany, IOrder, IProduct } from "../../domain";
import { IOrderEntity, IOrderItemEntity } from "../entities";
import { IOrderMapper } from "../mappers";
import { IOrderFilter, IOrderRepository } from "../repositories";
import {
  IOrderItemService,
  IOrderService,
  IProductService,
} from "./interfaces";

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject("ORDER_REPOSITORY")
    private readonly orderRepository: IOrderRepository,
    @Inject("ORDER_MAPPER")
    private readonly orderMapper: IOrderMapper,
    @Inject("ORDER_ITEM_INFRA_SERVICE")
    private readonly orderItemService: IOrderItemService,
    @Inject("PRODUCT_INFRA_SERVICE")
    private readonly productService: IProductService,
  ) {}

  async paginate(
    filters: IOrderFilter,
    company: ICompany,
  ): Promise<[IOrder[], number]> {
    const [orders, total] = await this.orderRepository.paginate({
      ...filters,
      companyId: company.getId(),
    });
    const products = await this.getProducts(orders, company);
    const ordersMapped = orders.map((order) =>
      this.makeOrder(order, company, products),
    );
    return [ordersMapped, total];
  }

  async getAll(company: ICompany): Promise<IOrder[]> {
    const orders = await this.orderRepository.getAll();
    const productIds = [
      ...new Set(orders.flatMap((order) => this.getProductIds(order.items))),
    ];
    const products = await this.productService.getByIds(
      productIds,
      company.getCatalogId()!,
    );
    return orders.map((order) => this.makeOrder(order, company, products));
  }

  async create(company: ICompany): Promise<IOrder> {
    const order = await this.orderRepository.save({
      id: uuid(),
      name: String(Math.floor(Date.now() / 1000)),
      companyId: company.getId(),
      items: [],
    });
    return this.orderMapper.toDomain(order, company, []);
  }

  private getProductIds(items: IOrderItemEntity[]): string[] {
    return [...new Set(items.map((item) => item.productId))];
  }

  private getProducts(
    orders: IOrderEntity[],
    company: ICompany,
  ): Promise<IProduct[]> {
    const productIds = [
      ...new Set(orders.flatMap((order) => this.getProductIds(order.items))),
    ];
    return this.productService.getByIds(productIds, company.getCatalogId()!);
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
