import { ICompany } from "../../../domain";
import { ICompanyEntity } from "../../entities";
import { ICompanyFilter } from "../../repositories";

export interface ICompanyService {
  paginate(filters: ICompanyFilter): Promise<[ICompany[], number]>;
  findById(id: string): Promise<ICompany>;
  create(data: Partial<ICompanyEntity>): Promise<ICompany>;
  update(id: string, data: Partial<ICompanyEntity>): Promise<ICompany>;
  delete(id: string): Promise<void>;
  findByCatalogIds(catalogIds: string[]): Promise<ICompany[]>;
  findByEmployeeId(employeeId: string): Promise<ICompany>;
}
