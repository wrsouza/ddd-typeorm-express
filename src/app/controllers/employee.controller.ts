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
  UseGuards,
} from "../../core";
import {
  DestroyResultDto,
  EmployeeCreateDto,
  EmployeePaginateDto,
  EmployeePaginateResultDto,
  EmployeeResultDto,
  EmployeeUpdateDto,
} from "../dtos";
import { AuthGuard } from "../guards/auth.guard";
import { IEmployeeService } from "../services";

@Controller("employees")
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(
    @Inject("EMPLOYEE_SERVICE")
    private readonly service: IEmployeeService,
  ) {}

  @Get()
  async paginate(
    @Query() params: EmployeePaginateDto,
  ): Promise<EmployeePaginateResultDto> {
    return this.service.paginate(params);
  }

  @Get(":id")
  async show(@Param("id") id: string): Promise<EmployeeResultDto> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() data: EmployeeCreateDto): Promise<EmployeeResultDto> {
    return this.service.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() data: EmployeeUpdateDto,
  ): Promise<EmployeeResultDto> {
    return this.service.update(id, data);
  }

  @Delete(":id")
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.service.destroy(id);
  }
}
