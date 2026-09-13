import { ICompanyJson } from "../../../domain";
import { ICompanyFilter } from "../../services";

export class CompanyPaginateResultDto {
  readonly data: ICompanyJson[];
  readonly page: number;
  readonly tpages: number;
  readonly limit: number;
  readonly total: number;
  readonly sort: string;

  constructor(data: ICompanyJson[], filters: ICompanyFilter, total: number) {
    this.data = data;
    this.page = Number(filters.page);
    this.tpages =
      total % filters.limit === 0
        ? total / filters.limit
        : Math.floor(total / filters.limit) + 1;
    this.limit = Number(filters.limit);
    this.total = total;
    this.sort = filters.sort;
  }
}
