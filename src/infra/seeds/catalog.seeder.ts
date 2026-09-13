import { faker } from "@faker-js/faker";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { database } from "../../config";
import { CatalogEntity, ICatalogEntity } from "../entities";

function makeCatalog(length: number): ICatalogEntity[] {
  const list: ICatalogEntity[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: uuid(),
      name: faker.color.human(),
      currency: faker.datatype.boolean(0.5) ? "USD" : "EUR",
    });
  }
  return list;
}

function getClient(): Repository<CatalogEntity> {
  return database.getRepository(CatalogEntity);
}

export async function seedCatalog(length: number): Promise<ICatalogEntity[]> {
  const catalogs = makeCatalog(length);
  return Promise.all(catalogs.map((catalog) => getClient().save(catalog)));
}
