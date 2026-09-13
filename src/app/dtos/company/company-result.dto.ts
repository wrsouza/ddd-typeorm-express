import { ICompanyJson } from "../../../domain";

export class CompanyResultDto {
  id: string;
  name: string;

  constructor(data: ICompanyJson) {
    this.id = data.id;
    this.name = data.name;
  }
}
