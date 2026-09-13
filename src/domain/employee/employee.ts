import { IEmployee, IEmployeeData, IEmployeeJson } from "./employee.interface";

export class Employee implements IEmployee {
  private id: string;
  private companyId: string;
  private name: string;
  private email: string;

  constructor(data: IEmployeeData) {
    this.id = data.id;
    this.companyId = data.companyId;
    this.name = data.name;
    this.email = data.email;
  }

  getId(): string {
    return this.id;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  toJson(): IEmployeeJson {
    return {
      id: this.id,
      companyId: this.companyId,
      name: this.name,
      email: this.email,
    };
  }
}
