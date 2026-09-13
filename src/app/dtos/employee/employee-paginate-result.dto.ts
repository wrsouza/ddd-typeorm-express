import { IEmployeeJson } from "../../../domain";
import { IEmployeeFilter } from "../../../infra/repositories";

export class EmployeePaginateResultDto {
  readonly data: IEmployeeJson[];
  readonly page: number;
  readonly tpages: number;
  readonly limit: number;
  readonly total: number;
  readonly sort: string;

  constructor(data: IEmployeeJson[], filters: IEmployeeFilter, total: number) {
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
