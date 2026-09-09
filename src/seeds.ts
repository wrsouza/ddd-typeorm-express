import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import {
  ICompanyEntity,
  IOrderEntity,
  IOrderItemEntity,
  IProductEntity,
} from "./entities";
import {
  companyRepository,
  productRepository,
  orderRepository,
} from "./routes/instances";

function makeCompanies(length: number) {
  const list: ICompanyEntity[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: uuid(),
      name: faker.company.name(),
    });
  }
  return list;
}

function makeProducts(length: number): IProductEntity[] {
  const list: IProductEntity[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: uuid(),
      sku: faker.commerce.upc(),
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 10, fractionDigits: 2, max: 500 }),
      category: faker.commerce.productAdjective(),
    });
  }
  return list;
}

function makeOrderItems(
  orderId: string,
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IOrderItemEntity[] {
  const list: IOrderItemEntity[] = [];
  for (let i = 0; i < length; i++) {
    const product =
      products[faker.number.int({ min: 0, max: products.length - 1 })];
    const quantity = faker.number.int({ min: 1, max: 10 });
    list.push({
      id: uuid(),
      orderId,
      productId: product.id,
      quantity,
      price: product.price,
    });
  }
  return list;
}

function makeOrders(
  length: number,
  companies: ICompanyEntity[],
  products: IProductEntity[],
): IOrderEntity[] {
  const list: IOrderEntity[] = [];
  for (let i = 0; i < length; i++) {
    const id = uuid();
    const company =
      companies[faker.number.int({ min: 0, max: companies.length - 1 })];
    const items = makeOrderItems(
      id,
      faker.number.int({ min: 1, max: 5 }),
      companies,
      products,
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

export default async function seeds() {
  const companies = makeCompanies(5);
  const companyEntities = await Promise.all(
    companies.map((company) => companyRepository.save(company)),
  );
  console.log("companies", companyEntities);

  const products = makeProducts(20);
  const productEntities = await Promise.all(
    products.map((product) => productRepository.save(product)),
  );

  const orders = makeOrders(10, companyEntities, productEntities);
  return Promise.all(orders.map((order) => orderRepository.save(order)));
}
