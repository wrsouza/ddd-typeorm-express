import { ICompanyJson } from "../../../domain";

export class CompanyResultDto {
  readonly data: ICompanyJson;

  constructor(data: ICompanyJson) {
    this.data = data;
  }
}
