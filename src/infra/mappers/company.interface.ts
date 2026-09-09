import { ICompanyEntity } from "../../entities";
import { ICompany } from "../../domain/company";

export interface ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany;
}
