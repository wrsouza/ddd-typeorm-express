import { IEmployeeEntity } from "../../entities";
import { IRepository } from "./repository.interface";
import { IFilter } from "./shared.interface";

export interface IEmployeeFilter extends IFilter {
  id?: string;
  companyId?: string;
  name?: string;
  email?: string;
}

export interface IEmployeeRepository extends IRepository<IEmployeeEntity> {
  paginate(params: IEmployeeFilter): Promise<[IEmployeeEntity[], number]>;
  create(data: Partial<IEmployeeEntity>): Promise<IEmployeeEntity>;
  update(id: string, data: Partial<IEmployeeEntity>): Promise<IEmployeeEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<IEmployeeEntity | null>;
}
