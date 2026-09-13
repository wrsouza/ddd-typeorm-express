import { NotFoundException } from "../../common/exceptions";
import { Inject, Injectable } from "../../core";
import { ICompany } from "../../domain";
import { ICompanyMapper } from "../mappers";
import { ICompanyRepository } from "../repositories";
import { ICompanyService } from "./interfaces";

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("COMPANY_REPOSITORY")
    private readonly companyRepository: ICompanyRepository,
    @Inject("COMPANY_MAPPER")
    private readonly companyMapper: ICompanyMapper,
  ) {}

  async getById(companyId: string): Promise<ICompany> {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new NotFoundException("company not found");
    }
    return this.companyMapper.toDomain(company);
  }

  async findByCatalogIds(catalogIds: string[]): Promise<ICompany[]> {
    const companies = await this.companyRepository.findByCatalogIds(catalogIds);
    return companies.map((company) => this.companyMapper.toDomain(company));
  }
}
