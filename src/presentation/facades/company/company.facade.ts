import { Inject, Injectable } from "../../../core";
import { ICompanyApplicationService } from "../../../application/services";
import {
  CompanyPaginateDto,
  CompanyPaginateResultDto,
  CompanyResultDto,
  CompanyUpsertDto,
  DestroyResultDto,
} from "../../dtos";
import { ICompanyFilterService } from "./company-filter.interface";
import { ICompanyFacade } from "./company.interface";

@Injectable()
export class CompanyFacade implements ICompanyFacade {
  constructor(
    @Inject("COMPANY_APPLICATION_SERVICE")
    private readonly service: ICompanyApplicationService,
    @Inject("COMPANY_FILTER")
    private readonly filterService: ICompanyFilterService,
  ) {}

  async paginate(
    params: CompanyPaginateDto,
  ): Promise<CompanyPaginateResultDto> {
    const filters = this.filterService.getFilter(params);
    const [companies, total] = await this.service.paginate(filters);
    return new CompanyPaginateResultDto(
      companies.map((company) => company.toJson()),
      filters,
      total,
    );
  }

  async findById(id: string): Promise<CompanyResultDto> {
    const company = await this.service.findById(id);
    return new CompanyResultDto(company.toJson());
  }

  async create(data: CompanyUpsertDto): Promise<CompanyResultDto> {
    const company = await this.service.create(data);
    return new CompanyResultDto(company.toJson());
  }

  async update(id: string, data: CompanyUpsertDto): Promise<CompanyResultDto> {
    const company = await this.service.update(id, data);
    return new CompanyResultDto(company.toJson());
  }

  async destroy(id: string): Promise<DestroyResultDto> {
    await this.service.delete(id);
    return new DestroyResultDto();
  }
}
