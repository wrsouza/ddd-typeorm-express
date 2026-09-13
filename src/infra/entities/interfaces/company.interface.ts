import { ICatalogEntity } from "./catalog.interface";

export interface ICompanyEntity {
  id: string;
  name: string;
  catalogId: string | null;
  catalog?: ICatalogEntity;
}
