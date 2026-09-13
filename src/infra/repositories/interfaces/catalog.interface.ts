import { ICatalogEntity } from "../../entities";
import { IRepository } from "./repository.interface";
import { IFilter } from "./shared.interface";

export interface ICatalogFilter extends IFilter {
  id?: string;
  name?: string;
}

export interface ICatalogRepository extends IRepository<ICatalogEntity> {
  paginate(params: ICatalogFilter): Promise<[ICatalogEntity[], number]>;
  create(data: Partial<ICatalogEntity>): Promise<ICatalogEntity>;
  update(id: string, data: Partial<ICatalogEntity>): Promise<ICatalogEntity>;
  delete(id: string): Promise<void>;
}
