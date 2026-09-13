import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { ICatalogEntity, IProductEntity } from "../entities";
import { productRepository } from "./instances";

function makeProducts(
  length: number,
  catalogs: ICatalogEntity[],
): IProductEntity[] {
  const list: IProductEntity[] = [];
  for (let i = 0; i < length; i++) {
    const catalog =
      catalogs[faker.number.int({ min: 0, max: catalogs.length - 1 })];
    list.push({
      id: uuid(),
      catalogId: catalog.id,
      sku: faker.commerce.upc(),
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, fractionDigits: 2, max: 500 }),
      category: faker.commerce.productAdjective(),
    });
  }
  return list;
}

export async function seedProduct(
  length: number,
  catalogs: ICatalogEntity[],
): Promise<IProductEntity[]> {
  const products = makeProducts(length, catalogs);
  return Promise.all(
    products.map((product) => productRepository.save(product)),
  );
}
