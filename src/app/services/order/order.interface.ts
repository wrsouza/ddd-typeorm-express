import {
  OrderCreateDto,
  OrderCreateResultDto,
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
  OrderUpdateDto,
  OrderUpdateResultDto,
} from "../../dtos";

export interface IOrderService {
  paginate(params: OrderPaginateDto): Promise<OrderPaginateResultDto>;
  create(body: OrderCreateDto): Promise<OrderCreateResultDto>;
  findById(id: string): Promise<OrderResultDto>;
  update(id: string, body: OrderUpdateDto): Promise<OrderUpdateResultDto>;
}
