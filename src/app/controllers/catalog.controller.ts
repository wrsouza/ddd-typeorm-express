import { Controller, Get, Inject, Query } from "../../core";
import { CatalogPaginateDto, CatalogPaginateResultDto } from "../dtos/catalog";
import { ICatalogService } from "../services/catalog";

@Controller("catalogs")
export class CatalogController {
  constructor(
    @Inject("CATALOG_SERVICE")
    private readonly service: ICatalogService,
  ) {}

  @Get()
  async paginate(
    @Query() params: CatalogPaginateDto,
  ): Promise<CatalogPaginateResultDto> {
    return this.service.paginate(params);
  }
}
