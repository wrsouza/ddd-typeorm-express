import { ICatalogEntity } from "./catalog.interface";

export interface ICatalogPriceEntity {
  catalogId: string;
  productId: string;
  currency: string;
  price: number;
  catalog?: ICatalogEntity;
}
