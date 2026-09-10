import { database } from "../config";
import { CompanyEntity, OrderEntity, ProductEntity } from "../infra/entities";
import {
  CompanyMapper,
  OrderItemMapper,
  OrderMapper,
  ProductMapper,
} from "../infra/mappers";
import {
  CompanyRepository,
  OrderRepository,
  ProductRepository,
} from "../infra/repositories";
import {
  CompanyService,
  OrderItemService,
  OrderService,
  ProductService,
} from "../infra/services";
import { OrdersUseCase } from "../usecases/orders/orders.usecase";

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

export const ordersUseCase = new OrdersUseCase(companyService, orderService);
