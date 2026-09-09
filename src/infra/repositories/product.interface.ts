import { IProductEntity } from "../../entities";
import { IRepository } from "./repository.interface";

export interface IProductRepository extends IRepository<IProductEntity> {
  getAll(): Promise<IProductEntity[]>;
  getByIds(ids: string[]): Promise<IProductEntity[]>;
}
