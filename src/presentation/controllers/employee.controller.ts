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
  employeeCreateSchema,
  EmployeePaginateDto,
  employeePaginateSchema,
  EmployeePaginateResultDto,
  EmployeeResultDto,
  EmployeeUpdateDto,
  employeeUpdateSchema,
} from "../dtos";
import { IEmployeeFacade } from "../facades";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "../decorators";
import { dataEnvelopeSchema, destroyResultSchema, paginateEnvelopeSchema } from "../swagger";

@ApiTags("Employees")
@Controller("employees")
export class EmployeeController {
  constructor(
    @Inject("EMPLOYEE_FACADE")
    private readonly facade: IEmployeeFacade,
  ) {}

  @Get()
  @ApiOperation({ summary: "List employees (paginated)" })
  @ApiQuery({ schema: employeePaginateSchema })
  @ApiResponse({
    status: 200,
    description: "Paginated employee list",
    schema: paginateEnvelopeSchema,
  })
  async paginate(
    @Query() params: EmployeePaginateDto,
  ): Promise<EmployeePaginateResultDto> {
    return this.facade.paginate(params);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an employee by id" })
  @ApiResponse({
    status: 200,
    description: "Employee",
    schema: dataEnvelopeSchema,
  })
  async show(@Param("id") id: string): Promise<EmployeeResultDto> {
    return this.facade.findById(id);
  }

  @Post()
  @ApiOperation({ summary: "Create an employee" })
  @ApiBody({ schema: employeeCreateSchema })
  @ApiResponse({
    status: 201,
    description: "Created employee",
    schema: dataEnvelopeSchema,
  })
  async create(@Body() data: EmployeeCreateDto): Promise<EmployeeResultDto> {
    return this.facade.create(data);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update an employee" })
  @ApiBody({ schema: employeeUpdateSchema })
  @ApiResponse({
    status: 200,
    description: "Updated employee",
    schema: dataEnvelopeSchema,
  })
  async update(
    @Param("id") id: string,
    @Body() data: EmployeeUpdateDto,
  ): Promise<EmployeeResultDto> {
    return this.facade.update(id, data);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an employee" })
  @ApiResponse({
    status: 200,
    description: "Deletion confirmation",
    schema: destroyResultSchema,
  })
  async destroy(@Param("id") id: string): Promise<DestroyResultDto> {
    return this.facade.destroy(id);
  }
}
