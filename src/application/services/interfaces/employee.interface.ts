import { IEmployee } from "../../../domain";
import { IEmployeeEntity } from "../../../infra/entities";
import { IEmployeeFilter } from "../../../infra/repositories";

export interface IEmployeeApplicationService {
  paginate(filters: IEmployeeFilter): Promise<[IEmployee[], number]>;
  findById(id: string): Promise<IEmployee>;
  create(data: Partial<IEmployeeEntity>): Promise<IEmployee>;
  update(id: string, data: Partial<IEmployeeEntity>): Promise<IEmployee>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IEmployeeEntity | null>;
}
