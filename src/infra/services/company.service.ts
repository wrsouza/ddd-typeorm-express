import { ICompany } from "../../domain";
import { ICompanyMapper } from "../mappers";
import { ICompanyRepository } from "../repositories";
import { ICompanyService } from "./interfaces";

export class CompanyService implements ICompanyService {
  constructor(
    private readonly companyRepository: ICompanyRepository,
    private readonly companyMapper: ICompanyMapper,
  ) {}

  async getById(companyId: string): Promise<ICompany> {
    const company = await this.companyRepository.getById(companyId);
    if (!company) {
      throw new Error("company not found");
    }
    return this.companyMapper.toDomain(company);
  }
}
