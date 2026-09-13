import { ICatalogJson } from "../../../domain";
import { ICatalogFilter } from "../../services";

export class CatalogPaginateResultDto {
  readonly data: ICatalogJson[];
  readonly page: number;
  readonly tpages: number;
  readonly limit: number;
  readonly total: number;
  readonly sort: string;

  constructor(
    catalogs: ICatalogJson[],
    filters: ICatalogFilter,
    total: number,
  ) {
    this.data = catalogs;
    this.page = filters.page;
    this.tpages =
      total % filters.limit === 0
        ? total / filters.limit
        : Math.floor(total / filters.limit) + 1;
    this.limit = filters.limit;
    this.total = total;
    this.sort = filters.sort;
  }
}
