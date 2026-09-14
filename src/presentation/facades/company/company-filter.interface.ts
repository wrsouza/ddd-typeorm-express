import { CompanyPaginateDto } from "../../dtos";
import { ICompanyFilter } from "../../../infra/repositories";

export { ICompanyFilter };

export interface ICompanyFilterService {
  getFilter(params: CompanyPaginateDto): ICompanyFilter;
}
