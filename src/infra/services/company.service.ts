import { ICompanyRepository } from "../repositories";
import { ICompanyMapper } from "../mappers";
import { ICompany } from "../../domain";
import { ICompanyService } from "./company.interface";

export class CompanyService implements ICompanyService {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly companyMapper: ICompanyMapper,
  ) {}

  async getById(companyId: string): Promise<ICompany | null> {
    const company = await this.companyRepository.getById(companyId);
    return company ? this.companyMapper.toDomain(company) : null;
  }
}
