import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import { CompanyEntity, ICatalogEntity, ICompanyEntity } from "../entities";

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
      catalog: catalogs[i],
    });
  }
  return list;
}

function getClient(): Repository<CompanyEntity> {
  return database.getRepository(CompanyEntity);
}

export async function seedCompany(
  length: number,
  catalogs: ICatalogEntity[],
): Promise<ICompanyEntity[]> {
  const companies = makeCompanies(length, catalogs);
  return Promise.all(companies.map((company) => getClient().save(company)));
}

export async function getAllCompanies(): Promise<ICompanyEntity[]> {
  return getClient().find();
}
