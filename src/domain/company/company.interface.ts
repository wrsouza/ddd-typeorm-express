export interface ICompanyData {
  id: string;
  name: string;
}

export interface ICompanyJson extends ICompanyData {}

export interface ICompany {
  getId(): string;
  getName(): string;
  toJson(): ICompanyJson;
}
