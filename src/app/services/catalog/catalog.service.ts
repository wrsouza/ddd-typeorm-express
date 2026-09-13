import { Inject, Injectable } from "../../../core";
import { ICatalogService as ICatalogInfraService } from "../../../infra/services";
import {
  CatalogPaginateDto,
  CatalogPaginateResultDto,
  CatalogResultDto,
  CatalogUpsertDto,
  DestroyResultDto,
} from "../../dtos";
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

  async findById(id: string): Promise<CatalogResultDto> {
    const catalog = await this.service.findById(id);
    return new CatalogResultDto(catalog.toJson());
  }

  async create(data: CatalogUpsertDto): Promise<CatalogResultDto> {
    const catalog = await this.service.create(data);
    return new CatalogResultDto(catalog.toJson());
  }

  async update(id: string, data: CatalogUpsertDto): Promise<CatalogResultDto> {
    const catalog = await this.service.update(id, data);
    return new CatalogResultDto(catalog.toJson());
  }

  async destroy(id: string): Promise<DestroyResultDto> {
    await this.service.delete(id);
    return new DestroyResultDto();
  }
}
