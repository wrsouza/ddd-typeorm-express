export interface ICompanyData {
  id: string;
  name: string;
  catalogId: string | null;
}

export interface ICompanyJson extends ICompanyData {}

export interface ICompany {
  getId(): string;
  getName(): string;
  getCatalogId(): string | null;
  toJson(): ICompanyJson;
}
