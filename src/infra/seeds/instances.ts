import { database } from "../../config";
import {
  CatalogEntity,
  CompanyEntity,
  DiscountEntity,
  OrderEntity,
  ProductEntity,
} from "../entities";

import {
  CatalogRepository,
  CompanyRepository,
  DiscountRepository,
  OrderRepository,
  ProductRepository,
} from "../repositories";

export const catalogRepository = new CatalogRepository(
  database.getRepository(CatalogEntity),
);
export const companyRepository = new CompanyRepository(
  database.getRepository(CompanyEntity),
);
export const orderRepository = new OrderRepository(
  database.getRepository(OrderEntity),
);
export const productRepository = new ProductRepository(
  database.getRepository(ProductEntity),
);
export const discountRepository = new DiscountRepository(
  database.getRepository(DiscountEntity),
);
