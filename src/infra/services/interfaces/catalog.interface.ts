import { ICatalog } from "../../../domain";
import { ICatalogEntity } from "../../entities";
import { ICatalogFilter } from "../../repositories";

export interface ICatalogService {
  paginate(filters: ICatalogFilter): Promise<[ICatalog[], number]>;
  findById(id: string): Promise<ICatalog>;
  create(data: Partial<ICatalogEntity>): Promise<ICatalog>;
  update(id: string, data: Partial<ICatalogEntity>): Promise<ICatalog>;
  delete(id: string): Promise<void>;
}
