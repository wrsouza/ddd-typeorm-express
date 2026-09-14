import {
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../../dtos";

export interface IOrderService {
  paginate(
    employeeId: string,
    params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto>;
  findById(employeeId: string, orderId: string): Promise<OrderResultDto>;
}
