import { ICompany } from "../company";
import { IProduct } from "../product";
import { ICatalog, ICatalogData, ICatalogJson } from "./catalog.interface";

export class Catalog implements ICatalog {
  private id: string;
  private name: string;
  private currency: string;
  private companies: ICompany[];
  private products: IProduct[];

  constructor(data: ICatalogData) {
    this.id = data.id;
    this.name = data.name;
    this.currency = data.currency;
    this.companies = data.companies;
    this.products = data.products;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCurrency(): string {
    return this.currency;
  }

  getCompanies(): ICompany[] {
    return this.companies;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  toJson(): ICatalogJson {
    return {
      id: this.id,
      name: this.name,
      currency: this.currency,
      companies: this.companies.map((company) => company.toJson()),
      products: this.products.map((product) => product.toJson()),
    };
  }
}
