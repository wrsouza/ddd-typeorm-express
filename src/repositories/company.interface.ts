import { ICompanyEntity } from "../entities";
import { IRepository } from "./repository.interface";

export interface ICompanyRepository extends IRepository<ICompanyEntity> {
  getById(id: string): Promise<ICompanyEntity | null>;
}
