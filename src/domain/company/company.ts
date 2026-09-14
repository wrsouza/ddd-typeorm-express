import { BadRequestException } from "../../common/exceptions";
import { ICompany, ICompanyData, ICompanyJson } from "./company.interface";

export class Company implements ICompany {
  private id: string;
  private name: string;
  private catalogId: string | null;

  constructor(data: ICompanyData) {
    if (!data.id) {
      throw new BadRequestException("company id is required");
    }
    if (!data.name) {
      throw new BadRequestException("company name is required");
    }
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
