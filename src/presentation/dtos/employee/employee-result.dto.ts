import { IEmployeeJson } from "../../../domain";

export class EmployeeResultDto {
  readonly data: IEmployeeJson;

  constructor(data: IEmployeeJson) {
    this.data = data;
  }
}
