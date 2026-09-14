import { ICatalogEntity } from "./catalog.interface";
import { IEmployeeEntity } from "./employee.interface";

export interface ICompanyEntity {
  id: string;
  name: string;
  catalogId: string | null;
  catalog?: ICatalogEntity;
  employees?: IEmployeeEntity[];
}
