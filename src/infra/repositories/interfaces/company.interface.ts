import { ICompanyEntity } from "../../entities";
import { IRepository } from "./repository.interface";

export interface ICompanyRepository extends IRepository<ICompanyEntity> {
  findByCatalogIds(catalogIds: string[]): Promise<ICompanyEntity[]>;
}
