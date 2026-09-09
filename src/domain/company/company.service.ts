import { ICompanyRepository } from "../../repositories";
import { ICompany, ICompanyMapper, ICompanyService } from "./company.interface";

export class CompanyService implements ICompanyService {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly companyMapper: ICompanyMapper,
  ) {}

  async getById(companyId: string): Promise<ICompany> {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new Error(`company ${companyId} not found`);
    }
    return this.companyMapper.toDomain(company);
  }
}
