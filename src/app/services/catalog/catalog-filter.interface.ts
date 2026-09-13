import { FindOperator } from "typeorm";
import { CatalogPaginateDto } from "../../dtos/catalog";
import { IFilter } from "../filters";

export interface ICatalogFilter extends IFilter {
  id?: string;
  name?: FindOperator<string>;
}

export interface ICatalogFilterService {
  getFilter(params: CatalogPaginateDto): IFilter;
}
