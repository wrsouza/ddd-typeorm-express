import { ICatalog } from "../../../domain";
import { ICatalogEntity } from "../../../infra/entities";
import { ICatalogFilter } from "../../../infra/repositories";

export interface ICatalogApplicationService {
  paginate(filters: ICatalogFilter): Promise<[ICatalog[], number]>;
  findById(id: string): Promise<ICatalog>;
  create(data: Partial<ICatalogEntity>): Promise<ICatalog>;
  update(id: string, data: Partial<ICatalogEntity>): Promise<ICatalog>;
  delete(id: string): Promise<void>;
}
