import { Injectable } from "../../core";
import { Employee, IEmployee } from "../../domain";
import { IEmployeeEntity } from "../entities";
import { IEmployeeMapper } from "./interfaces/employee.interface";

@Injectable()
export class EmployeeMapper implements IEmployeeMapper {
  toDomain(data: IEmployeeEntity): IEmployee {
    return new Employee({
      id: data.id,
      companyId: data.companyId,
      name: data.name,
      email: data.email,
    });
  }
}
