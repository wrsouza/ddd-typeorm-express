import {
  CompanyPaginateDto,
  CompanyPaginateResultDto,
  CompanyResultDto,
} from "../../dtos";

export interface ICompanyService {
  paginate(params: CompanyPaginateDto): Promise<CompanyPaginateResultDto>;
  findById(id: string): Promise<CompanyResultDto>;
}
