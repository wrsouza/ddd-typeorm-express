import { ICompany } from "../../domain";
export interface ICompanyService {
  getById(companyId: string): Promise<ICompany | null>;
}
