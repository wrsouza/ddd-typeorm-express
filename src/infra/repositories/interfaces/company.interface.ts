import { ICompanyEntity } from "../../entities";
import { IRepository } from "./repository.interface";
import { IFilter } from "./shared.interface";

export interface ICompanyFilter extends IFilter {
  id?: string;
  catalogId?: string | null;
  name?: string;
}

export interface ICompanyRepository extends IRepository<ICompanyEntity> {
  paginate(params: ICompanyFilter): Promise<[ICompanyEntity[], number]>;
  create(data: Partial<ICompanyEntity>): Promise<ICompanyEntity>;
  update(id: string, data: Partial<ICompanyEntity>): Promise<ICompanyEntity>;
  delete(id: string): Promise<void>;
  findByCatalogIds(catalogIds: string[]): Promise<ICompanyEntity[]>;
  findByEmployeeId(employeeId: string): Promise<ICompanyEntity | null>;
}
