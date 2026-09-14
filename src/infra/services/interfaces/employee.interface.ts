import { IEmployee } from "../../../domain";
import { IEmployeeEntity } from "../../entities";
import { IEmployeeFilter } from "../../repositories";

export interface IEmployeeService {
  paginate(filters: IEmployeeFilter): Promise<[IEmployee[], number]>;
  findById(id: string): Promise<IEmployee>;
  create(data: Partial<IEmployeeEntity>): Promise<IEmployee>;
  update(id: string, data: Partial<IEmployeeEntity>): Promise<IEmployee>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IEmployeeEntity | null>;
}
