import { ICompany } from "../../domain/company";

export interface ICompanyService {
  getById(companyId: string): Promise<ICompany | null>;
}
