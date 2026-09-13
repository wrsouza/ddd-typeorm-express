import { ICatalogPriceEntity } from "./catalog-price.interface";

export interface IProductEntity {
  id: string;
  sku: string;
  name: string;
  category: string;
  prices?: ICatalogPriceEntity[];
}
