import { ICompany, ICompanyData, ICompanyJson } from "./company.interface";

export class Company implements ICompany {
  private id: string;
  private name: string;

  constructor(data: ICompanyData) {
    if (!data.id) {
      throw new Error("company id is required");
    }
    if (!data.name) {
      throw new Error("company name is required");
    }

    this.id = data.id;
    this.name = data.name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  toJson(): ICompanyJson {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
