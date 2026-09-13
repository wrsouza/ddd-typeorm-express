import { ICompany, ICompanyData, ICompanyJson } from "./company.interface";

export class Company implements ICompany {
  private id: string;
  private name: string;
  private catalogId: string | null;

  constructor(data: ICompanyData) {
    this.id = data.id;
    this.name = data.name;
    this.catalogId = data.catalogId;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCatalogId(): string | null {
    return this.catalogId;
  }

  toJson(): ICompanyJson {
    return {
      id: this.id,
      name: this.name,
      catalogId: this.catalogId,
    };
  }
}
