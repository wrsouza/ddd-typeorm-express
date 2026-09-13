import { ICompany, ICompanyJson } from "../company";
import { IProduct, IProductJson } from "../product";

export interface ICatalogData {
  id: string;
  name: string;
  companies: ICompany[];
  products: IProduct[];
}

export interface ICatalogJson {
  id: string;
  name: string;
  companies: ICompanyJson[];
  products: IProductJson[];
}

export interface ICatalog {
  getId(): string;
  getName(): string;
  getCompanies(): ICompany[];
  getProducts(): IProduct[];
  toJson(): ICatalogJson;
}
