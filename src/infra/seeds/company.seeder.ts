import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { ICatalogEntity, ICompanyEntity } from "../entities";
import { companyRepository } from "./instances";

function makeCompanies(
  length: number,
  catalogs: ICatalogEntity[],
): ICompanyEntity[] {
  const list: ICompanyEntity[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: uuid(),
      name: faker.company.name(),
      catalogId: catalogs[i].id,
    });
  }
  return list;
}

export async function seedCompany(
  length: number,
  catalogs: ICatalogEntity[],
): Promise<ICompanyEntity[]> {
  const companies = makeCompanies(length, catalogs);
  return Promise.all(
    companies.map((company) => companyRepository.save(company)),
  );
}
