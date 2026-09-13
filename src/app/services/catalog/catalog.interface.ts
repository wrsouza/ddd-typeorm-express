import {
  CatalogPaginateDto,
  CatalogPaginateResultDto,
} from "../../dtos/catalog";

export interface ICatalogService {
  paginate(params: CatalogPaginateDto): Promise<CatalogPaginateResultDto>;
}
