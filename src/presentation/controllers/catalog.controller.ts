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
  catalogPaginateSchema,
  CatalogPaginateResultDto,
  CatalogResultDto,
  catalogUpsertSchema,
  CatalogUpsertDto,
  DestroyResultDto,
} from "../dtos";
import { ICatalogFacade } from "../facades";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "../decorators";
import { dataEnvelopeSchema, destroyResultSchema, paginateEnvelopeSchema } from "../swagger";

@ApiTags("Catalogs")
@Controller("catalogs")
export class CatalogController {
  constructor(
    @Inject("CATALOG_FACADE")
    private readonly facade: ICatalogFacade,
  ) {}

  @Get()
  @ApiOperation({ summary: "List catalogs (paginated)" })
  @ApiQuery({ schema: catalogPaginateSchema })
  @ApiResponse({
    status: 200,
    description: "Paginated catalog list",
    schema: paginateEnvelopeSchema,
  })
  async paginate(
    @Query() params: CatalogPaginateDto,
  ): Promise<CatalogPaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a catalog by id" })
  @ApiResponse({
    status: 200,
    description: "Catalog",
    schema: dataEnvelopeSchema,
  })
  async show(@Param("id") id: string): Promise<CatalogResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a catalog" })
  @ApiBody({ schema: catalogUpsertSchema })
  @ApiResponse({
    status: 201,
    description: "Created catalog",
    schema: dataEnvelopeSchema,
  })
  async create(@Body() data: CatalogUpsertDto): Promise<CatalogResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a catalog" })
  @ApiBody({ schema: catalogUpsertSchema })
  @ApiResponse({
    status: 200,
    description: "Updated catalog",
    schema: dataEnvelopeSchema,
  })
  async update(
    @Param("id") id: string,
    @Body() data: CatalogUpsertDto,
  ): Promise<CatalogResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a catalog" })
  @ApiResponse({
    status: 200,
    description: "Deletion confirmation",
    schema: destroyResultSchema,
  })
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
