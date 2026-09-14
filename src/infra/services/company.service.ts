import { NotFoundException } from "../../common/exceptions";
import { Inject, Injectable } from "../../core";
import { ICompany } from "../../domain";
import { ICompanyEntity } from "../entities";
import { ICompanyMapper } from "../mappers";
import { ICompanyFilter, ICompanyRepository } from "../repositories";
import { ICompanyService } from "./interfaces";

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("COMPANY_REPOSITORY")
    private readonly companyRepository: ICompanyRepository,
    @Inject("COMPANY_MAPPER")
    private readonly companyMapper: ICompanyMapper,
  ) {}

  async paginate(filters: ICompanyFilter): Promise<[ICompany[], number]> {
    const [companies, total] = await this.companyRepository.paginate(filters);
    const companiesMapped = companies.map((company) =>
      this.companyMapper.toDomain(company),
    );
    return [companiesMapped, total];
  }

  async findById(id: string): Promise<ICompany> {
    const company = await this.companyRepository.getById(id);
    if (!company) {
      throw new NotFoundException("company not found");
    }
    return this.companyMapper.toDomain(company);
  }

  async create(data: Partial<ICompanyEntity>): Promise<ICompany> {
    const catalog = await this.companyRepository.create(data);
    return this.companyMapper.toDomain(catalog);
  }

  async update(id: string, data: Partial<ICompanyEntity>): Promise<ICompany> {
    const company = await this.companyRepository.update(id, data);
    return this.companyMapper.toDomain(company);
  }

  async delete(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async findByCatalogIds(catalogIds: string[]): Promise<ICompany[]> {
    const companies = await this.companyRepository.findByCatalogIds(catalogIds);
    return companies.map((company) => this.companyMapper.toDomain(company));
  }

  async findByEmployeeId(employeeId: string): Promise<ICompany> {
    const company = await this.companyRepository.findByEmployeeId(employeeId);
    if (!company) {
      throw new NotFoundException("company not found");
    }
    return this.companyMapper.toDomain(company);
  }
}
