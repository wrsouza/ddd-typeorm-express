import { ICompany, ICompanyData, ICompanyJson } from "./company.interface";

export class Company implements ICompany {
  private id: string;
  private name: string;

  constructor(data: ICompanyData) {
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
