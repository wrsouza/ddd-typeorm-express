import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import {
  ICatalogEntity,
  ICatalogPriceEntity,
  IProductEntity,
  ProductEntity,
} from "../entities";

function makePrices(
  productId: string,
  catalogs: ICatalogEntity[],
): ICatalogPriceEntity[] {
  let prices: ICatalogPriceEntity[] = [];
  for (const catalog of catalogs) {
    prices.push({
      productId,
      catalogId: catalog.id,
      catalog,
      currency: catalog.currency,
      price: faker.number.float({ min: 10, fractionDigits: 2, max: 500 }),
    });
  }
  return prices;
}

function makeProducts(
  length: number,
  catalogs: ICatalogEntity[],
): IProductEntity[] {
  const list: IProductEntity[] = [];
  for (let i = 0; i < length; i++) {
    const id = uuid();
    list.push({
      id,
      sku: faker.commerce.upc(),
      name: faker.commerce.productName(),
      category: faker.commerce.productAdjective(),
      prices: makePrices(id, catalogs),
    });
  }
  return list;
}

function getClient(): Repository<ProductEntity> {
  return database.getRepository(ProductEntity);
}

export async function seedProduct(
  length: number,
  catalogs: ICatalogEntity[],
): Promise<IProductEntity[]> {
  const products = makeProducts(length, catalogs);
  return Promise.all(products.map((product) => getClient().save(product)));
}
