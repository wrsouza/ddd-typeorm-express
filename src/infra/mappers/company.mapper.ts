import { ICompanyEntity } from "../../entities";
import { Company, ICompany } from "../../domain/company";

export interface ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany;
}

export class CompanyMapper implements ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany {
    return new Company({
      id: data.id,
      name: data.name,
    });
  }
}
