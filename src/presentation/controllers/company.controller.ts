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
  CompanyPaginateDto,
  companyPaginateSchema,
  CompanyPaginateResultDto,
  CompanyResultDto,
  companyUpsertSchema,
  CompanyUpsertDto,
  DestroyResultDto,
} from "../dtos";
import { ICompanyFacade } from "../facades";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "../decorators";
import { dataEnvelopeSchema, destroyResultSchema, paginateEnvelopeSchema } from "../swagger";

@ApiTags("Companies")
@Controller("companies")
export class CompanyController {
  constructor(
    @Inject("COMPANY_FACADE")
    private readonly facade: ICompanyFacade,
  ) {}

  @Get()
  @ApiOperation({ summary: "List companies (paginated)" })
  @ApiQuery({ schema: companyPaginateSchema })
  @ApiResponse({
    status: 200,
    description: "Paginated company list",
    schema: paginateEnvelopeSchema,
  })
  async paginate(
    @Query() params: CompanyPaginateDto,
  ): Promise<CompanyPaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a company by id" })
  @ApiResponse({
    status: 200,
    description: "Company",
    schema: dataEnvelopeSchema,
  })
  async show(@Param("id") id: string): Promise<CompanyResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Create a company" })
  @ApiBody({ schema: companyUpsertSchema })
  @ApiResponse({
    status: 201,
    description: "Created company",
    schema: dataEnvelopeSchema,
  })
  async create(@Body() data: CompanyUpsertDto): Promise<CompanyResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update a company" })
  @ApiBody({ schema: companyUpsertSchema })
  @ApiResponse({
    status: 200,
    description: "Updated company",
    schema: dataEnvelopeSchema,
  })
  async update(
    @Param("id") id: string,
    @Body() data: CompanyUpsertDto,
  ): Promise<CompanyResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a company" })
  @ApiResponse({
    status: 200,
    description: "Deletion confirmation",
    schema: destroyResultSchema,
  })
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
