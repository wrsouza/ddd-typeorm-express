import { Inject, Injectable } from "../../../core";
import { ICatalogService as ICatalogInfraService } from "../../../infra/services";
import {
  CatalogPaginateDto,
  CatalogPaginateResultDto,
} from "../../dtos/catalog";
import { ICatalogFilterService } from "./catalog-filter.interface";
import { ICatalogService } from "./catalog.interface";

@Injectable()
export class CatalogService implements ICatalogService {
  constructor(
    @Inject("CATALOG_INFRA_SERVICE")
    private readonly service: ICatalogInfraService,
    @Inject("CATALOG_FILTER")
    private readonly filterService: ICatalogFilterService,
  ) {}

  async paginate(
    params: CatalogPaginateDto,
  ): Promise<CatalogPaginateResultDto> {
    const filters = this.filterService.getFilter(params);
    const [catalogs, total] = await this.service.paginate(filters);
    return new CatalogPaginateResultDto(
      catalogs.map((catalog) => catalog.toJson()),
      filters,
      total,
    );
  }
}
