import { IEmployeeFilter } from "../../../infra/repositories";
import { EmployeePaginateDto } from "../../dtos";

export interface IEmployeeFilterService {
  getFilter(params: EmployeePaginateDto): IEmployeeFilter;
}
