import { IOrderFilter } from "../../../infra/repositories";
import { OrderPaginateDto } from "../../dtos";

export interface IOrderFilterService {
  getFilter(params: OrderPaginateDto): IOrderFilter;
}
