import { ICatalogFilter } from "../../../app/services";
import { ICatalogEntity } from "../../entities/interfaces/catalog.interface";
import { IRepository } from "./repository.interface";

export interface ICatalogRepository extends IRepository<ICatalogEntity> {
  paginate(params: ICatalogFilter): Promise<[ICatalogEntity[], number]>;
}
