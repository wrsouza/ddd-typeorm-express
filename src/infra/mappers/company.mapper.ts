import { Injectable } from "../../core";
import { Company, ICompany } from "../../domain/company";
import { ICompanyEntity } from "../entities";
import { ICompanyMapper } from "./interfaces/company.interface";

@Injectable()
export class CompanyMapper implements ICompanyMapper {
  toDomain(data: ICompanyEntity): ICompany {
    return new Company({
      id: data.id,
      name: data.name,
      catalogId: data.catalogId,
    });
  }
}
