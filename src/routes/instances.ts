import { database } from "../config";
import { CompanyMapper, CompanyService } from "../domain/company";
import { OrderMapper, OrderService } from "../domain/order";
import { OrderItemMapper, OrderItemService } from "../domain/order-item";
import { ProductMapper } from "../domain/product/product.mapper";
import { ProductService } from "../domain/product/product.service";
import { CompanyEntity, OrderEntity, ProductEntity } from "../entities";
import {
  CompanyRepository,
  OrderRepository,
  ProductRepository,
} from "../repositories";
import { OrdersService } from "../usecases/orders/orders.service";

export const companyRepository = new CompanyRepository(
  database.getRepository(CompanyEntity),
);
export const orderRepository = new OrderRepository(
  database.getRepository(OrderEntity),
);
export const productRepository = new ProductRepository(
  database.getRepository(ProductEntity),
);

const companyService = new CompanyService(
  companyRepository,
  new CompanyMapper(),
);

const productService = new ProductService(
  productRepository,
  new ProductMapper(),
);

const orderItemService = new OrderItemService(new OrderItemMapper());
const orderService = new OrderService(
  orderRepository,
  new OrderMapper(),
  orderItemService,
  productService,
);

export const ordersService = new OrdersService(companyService, orderService);
