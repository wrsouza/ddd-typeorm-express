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
import { ICatalogService } from "../services";

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

  @Get(":id")
  async show(@Param("id") id: string): Promise<CatalogResultDto> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() data: CatalogUpsertDto): Promise<CatalogResultDto> {
    return this.service.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: CatalogUpsertDto,
  ): Promise<CatalogResultDto> {
    return this.service.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.service.destroy(id);
  }
}
