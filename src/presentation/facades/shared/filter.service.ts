import { IFilter, IFilterData, ISort } from "../../../infra/repositories";
import { IFilterService } from "./filter.interface";

export abstract class FilterService implements IFilterService {
  getFilter(params: IFilterData): IFilter {
    return {
      page: this.getPage(params),
      limit: this.getLimit(params),
      ...this.getSort(params),
    };
  }

  protected getPage(params: IFilterData): number {
    const page = params.page;
    if (!page || page < 1) {
      return 1;
    }
    return page;
  }

  protected getLimit(params: IFilterData): number {
    const limit = params.limit;
    if (!limit) {
      return 10;
    }
    return limit;
  }

  protected getSort(params: IFilterData): ISort {
    const sort = params.sort;
    if (!sort) {
      return {
        sort: "id",
        order: {
          name: "ASC",
        },
      };
    }

    const direction = sort.startsWith("-") ? "DESC" : "ASC";
    const order = sort.startsWith("-") ? sort.substring(1) : sort;
    return {
      sort,
      order: {
        [order]: direction,
      },
    };
  }
}
