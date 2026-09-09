import { ICompanyEntity } from "../../entities";
import { Company } from "./company";
import { ICompany, ICompanyMapper } from "./company.interface";

export class CompanyMapper implements ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany {
    return new Company({
      id: data.id,
      name: data.name,
    });
  }
}
