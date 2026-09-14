import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from "../../core";
import {
  CatalogPaginateDto,
  CatalogPaginateResultDto,
  CatalogResultDto,
  CatalogUpsertDto,
  DestroyResultDto,
} from "../dtos";
import { ICatalogFacade } from "../facades";

@Controller("catalogs")
export class CatalogController {
  constructor(
    @Inject("CATALOG_FACADE")
    private readonly facade: ICatalogFacade,
  ) {}

  @Get()
  async paginate(
    @Query() params: CatalogPaginateDto,
  ): Promise<CatalogPaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<CatalogResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  async create(@Body() data: CatalogUpsertDto): Promise<CatalogResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: CatalogUpsertDto,
  ): Promise<CatalogResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
