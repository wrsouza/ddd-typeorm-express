import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";
import { ICatalogEntity } from "../entities";
import { catalogRepository } from "./instances";

function makeCatalog(length: number): ICatalogEntity[] {
  const list: ICatalogEntity[] = [];
  for (let i = 0; i < length; i++) {
    list.push({
      id: uuid(),
      name: faker.color.human(),
    });
  }
  return list;
}

export async function seedCatalog(length: number): Promise<ICatalogEntity[]> {
  const catalogs = makeCatalog(length);
  return Promise.all(
    catalogs.map((catalog) => catalogRepository.save(catalog)),
  );
}
