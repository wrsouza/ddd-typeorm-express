import { ICatalogFilter } from "../../../app/services";
import { ICatalog } from "../../../domain";

export interface ICatalogService {
  paginate(filters: ICatalogFilter): Promise<[ICatalog[], number]>;
}
