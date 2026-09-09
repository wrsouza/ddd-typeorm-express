export interface ICompanyData {
  id: string;
  name: string;
}

export interface ICompany {
  getId(): string;
  getName(): string;
}

export interface ICompanyService {
  getById(companyId: string): Promise<ICompany | null>;
}
