import { ICompanyFilter } from "../../../infra/repositories";
import { CompanyPaginateDto } from "../../dtos";

export interface ICompanyFilterService {
  getFilter(params: CompanyPaginateDto): ICompanyFilter;
}
