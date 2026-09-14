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
  CompanyPaginateResultDto,
  CompanyResultDto,
  CompanyUpsertDto,
  DestroyResultDto,
} from "../dtos";
import { ICompanyFacade } from "../facades";

@Controller("companies")
export class CompanyController {
  constructor(
    @Inject("COMPANY_FACADE")
    private readonly facade: ICompanyFacade,
  ) {}

  @Get()
  async paginate(
    @Query() params: CompanyPaginateDto,
  ): Promise<CompanyPaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<CompanyResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  async create(@Body() data: CompanyUpsertDto): Promise<CompanyResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: CompanyUpsertDto,
  ): Promise<CompanyResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
