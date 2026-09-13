import { IProductEntity } from "../../entities";
import { IRepository } from "./repository.interface";

export interface IProductRepository extends IRepository<IProductEntity> {
  findByCatalogIds(catalogIds: string[]): Promise<IProductEntity[]>;
}
