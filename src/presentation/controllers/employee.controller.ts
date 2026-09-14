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
  DestroyResultDto,
  EmployeeCreateDto,
  EmployeePaginateDto,
  EmployeePaginateResultDto,
  EmployeeResultDto,
  EmployeeUpdateDto,
} from "../dtos";
import { IEmployeeFacade } from "../facades";

@Controller("employees")
export class EmployeeController {
  constructor(
    @Inject("EMPLOYEE_FACADE")
    private readonly facade: IEmployeeFacade,
  ) {}

  @Get()
  async paginate(
    @Query() params: EmployeePaginateDto,
  ): Promise<EmployeePaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<EmployeeResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  async create(@Body() data: EmployeeCreateDto): Promise<EmployeeResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: EmployeeUpdateDto,
  ): Promise<EmployeeResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
