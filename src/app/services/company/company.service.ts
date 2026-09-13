import { Inject, Injectable } from "../../../core";
import { ICompanyService as ICompanyInfraService } from "../../../infra/services";
import {
  CompanyPaginateDto,
  CompanyPaginateResultDto,
  CompanyResultDto,
} from "../../dtos";
import { ICompanyService } from "./company.interface";

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("COMPANY_INFRA_SERVICE")
    private readonly service: ICompanyInfraService,
  ) {}

  async paginate(
    params: CompanyPaginateDto,
  ): Promise<CompanyPaginateResultDto> {
    throw new Error("method not implemented");
  }

  async findById(id: string): Promise<CompanyResultDto> {
    const company = await this.service.getById(id);
    return new CompanyResultDto(company.toJson());
  }
}
