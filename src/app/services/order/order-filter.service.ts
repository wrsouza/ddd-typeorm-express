import { Injectable } from "../../../core";
import { IOrderFilter } from "../../../infra/repositories/interfaces";
import { OrderPaginateDto } from "../../dtos";
import { FilterService } from "../shared";
import { IOrderFilterService } from "./order-filter.interface";

@Injectable()
export class OrderFilterService
  extends FilterService
  implements IOrderFilterService
{
  override getFilter(params: OrderPaginateDto): IOrderFilter {
    return {
      ...super.getFilter(params),
      ...this.getId(params),
      ...this.getName(params),
    };
  }

  private getId(params: OrderPaginateDto) {
    const id = params.id;
    if (!id) {
      return {};
    }
    return {
      id,
    };
  }

  private getName(params: OrderPaginateDto) {
    const name = params.name;
    if (!name) {
      return {};
    }
    return {
      name,
    };
  }
}
