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
import { ICompanyService } from "../services";

@Controller("companies")
export class CompanyController {
  constructor(
    @Inject("COMPANY_SERVICE")
    private readonly service: ICompanyService,
  ) {}

  @Get()
  async paginate(
    @Query() params: CompanyPaginateDto,
  ): Promise<CompanyPaginateResultDto> {
    return this.service.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<CompanyResultDto> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() data: CompanyUpsertDto): Promise<CompanyResultDto> {
    return this.service.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: CompanyUpsertDto,
  ): Promise<CompanyResultDto> {
    return this.service.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.service.destroy(id);
  }
}
