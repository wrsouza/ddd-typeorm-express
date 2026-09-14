import {
  CatalogPaginateDto,
  CatalogPaginateResultDto,
  CatalogResultDto,
  CatalogUpsertDto,
  DestroyResultDto,
} from "../../dtos";

export interface ICatalogFacade {
  paginate(params: CatalogPaginateDto): Promise<CatalogPaginateResultDto>;
  findById(id: string): Promise<CatalogResultDto>;
  create(data: CatalogUpsertDto): Promise<CatalogResultDto>;
  update(id: string, data: CatalogUpsertDto): Promise<CatalogResultDto>;
  destroy(id: string): Promise<DestroyResultDto>;
}
