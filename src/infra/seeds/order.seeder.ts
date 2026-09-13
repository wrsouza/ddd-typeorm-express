import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import {
  ICatalogEntity,
  ICompanyEntity,
  IDiscountEntity,
  IOrderEntity,
  IOrderItemEntity,
  IProductEntity,
  OrderEntity,
} from "../entities";

function makeOrderItems(
  orderId: string,
  length: number,
  catalog: ICatalogEntity,
  products: IProductEntity[],
  discounts: IDiscountEntity[],
): IOrderItemEntity[] {
  const list: IOrderItemEntity[] = [];
  for (let i = 0; i < length; i++) {
    const product =
      products[faker.number.int({ min: 0, max: products.length - 1 })];
    const quantity = faker.number.int({ min: 1, max: 10 });
    const discount =
      discounts.find((discount) => discount.products.includes(product)) ?? null;
    const priceItem = product.prices?.find(
      (price) => price.catalogId === catalog.id,
    );

    if (!priceItem) {
      continue;
    }

    list.push({
      id: uuid(),
      orderId,
      productId: product.id,
      quantity,
      price: priceItem.price,
    });
  }
  return list;
}

function makeOrders(
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
  discounts: IDiscountEntity[],
): IOrderEntity[] {
  const list: IOrderEntity[] = [];
  for (let i = 0; i < length; i++) {
    const id = uuid();
    const company =
      companies[faker.number.int({ min: 0, max: companies.length - 1 })];

    const items = makeOrderItems(
      id,
      faker.number.int({ min: 1, max: 5 }),
      company.catalog!,
      products,
      discounts.filter((discount) => discount.companies.includes(company)),
    );

    list.push({
      id,
      name: faker.commerce.isbn({ separator: "" }),
      companyId: company.id,
      items,
    });
  }
  return list;
}

function getClient(): Repository<OrderEntity> {
  return database.getRepository(OrderEntity);
}

export async function seedOrder(
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
  discounts: IDiscountEntity[],
): Promise<IOrderEntity[]> {
  const orders = makeOrders(length, companies, products, discounts);
  return Promise.all(orders.map((order) => getClient().save(order)));
}
