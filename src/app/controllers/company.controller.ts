import { Controller, Get, Inject, Param, Query } from "../../core";
import {
  CompanyPaginateDto,
  CompanyPaginateResultDto,
  CompanyResultDto,
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
}
