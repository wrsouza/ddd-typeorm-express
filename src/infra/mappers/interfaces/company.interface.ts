import { ICompany } from "../../../domain/company";
import { ICompanyEntity } from "../../entities";

export interface ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany;
}
