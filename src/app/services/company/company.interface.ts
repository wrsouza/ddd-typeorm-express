import {
  CompanyPaginateDto,
  CompanyPaginateResultDto,
  CompanyResultDto,
  CompanyUpsertDto,
  DestroyResultDto,
} from "../../dtos";

export interface ICompanyService {
  paginate(params: CompanyPaginateDto): Promise<CompanyPaginateResultDto>;
  findById(id: string): Promise<CompanyResultDto>;
  create(data: CompanyUpsertDto): Promise<CompanyResultDto>;
  update(id: string, data: CompanyUpsertDto): Promise<CompanyResultDto>;
  destroy(id: string): Promise<DestroyResultDto>;
}
