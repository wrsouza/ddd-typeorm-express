import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { ICompanyEntity, IProductEntity } from "./entities";
import { companyRepository, productRepository } from "./routes/instances";

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

export default function seeds() {
  const companies = makeCompanies(5);
  const products = makeProducts(20);

  const promises = [];

  for (const company of companies) {
    promises.push(companyRepository.save(company));
  }

  for (const product of products) {
    promises.push(productRepository.save(product));
  }

  return Promise.all(promises);
}
