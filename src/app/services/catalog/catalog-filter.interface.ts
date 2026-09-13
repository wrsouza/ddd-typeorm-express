import { ICatalogFilter } from "../../../infra/repositories";
import { CatalogPaginateDto } from "../../dtos/catalog";

export interface ICatalogFilterService {
  getFilter(params: CatalogPaginateDto): ICatalogFilter;
}
