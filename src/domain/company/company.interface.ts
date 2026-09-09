import { ICompanyEntity } from "../../entities";

export interface ICompanyData {
  id: string;
  name: string;
}

export interface ICompanyJson {
  id: string;
  name: string;
}

export interface ICompany {
  getId(): string;
  getName(): string;
  toJson(): ICompanyJson;
}

export interface ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany;
}

export interface ICompanyService {
  getById(companyId: string): Promise<ICompany>;
}
