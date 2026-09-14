import { BadRequestException } from "../../common/exceptions";
import { IEmployee, IEmployeeData, IEmployeeJson } from "./employee.interface";

export class Employee implements IEmployee {
  private id: string;
  private companyId: string;
  private name: string;
  private email: string;

  constructor(data: IEmployeeData) {
    if (!data.id) {
      throw new BadRequestException("employee id is required");
    }
    if (!data.companyId) {
      throw new BadRequestException("employee companyId is required");
    }
    if (!data.name) {
      throw new BadRequestException("employee name is required");
    }
    if (!data.email) {
      throw new BadRequestException("employee email is required");
    }
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
