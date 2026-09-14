import {
  OrderItemCreateDto,
  OrderPaginateDto,
  OrderPaginateResultDto,
  OrderResultDto,
} from "../../dtos";

export interface IOrderFacade {
  paginate(
    employeeId: string,
    params: OrderPaginateDto,
  ): Promise<OrderPaginateResultDto>;
  findById(employeeId: string, orderId: string): Promise<OrderResultDto>;
  addItem(
    employeeId: string,
    orderId: string,
    data: OrderItemCreateDto,
  ): Promise<OrderResultDto>;
}
