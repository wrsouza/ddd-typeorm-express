import { Inject, Injectable } from "../../../core";
import { IEmployeeApplicationService } from "../../../application/services";
import {
  DestroyResultDto,
  EmployeeCreateDto,
  EmployeePaginateDto,
  EmployeePaginateResultDto,
  EmployeeResultDto,
  EmployeeUpdateDto,
} from "../../dtos";
import { IEmployeeFilterService } from "./employee-filter.interface";
import { IEmployeeFacade } from "./employee.interface";

@Injectable()
export class EmployeeFacade implements IEmployeeFacade {
  constructor(
    @Inject("EMPLOYEE_APPLICATION_SERVICE")
    private readonly service: IEmployeeApplicationService,
    @Inject("EMPLOYEE_FILTER")
    private readonly filterService: IEmployeeFilterService,
  ) {}

  async paginate(
    params: EmployeePaginateDto,
  ): Promise<EmployeePaginateResultDto> {
    const filters = this.filterService.getFilter(params);
    const [employees, total] = await this.service.paginate(filters);
    return new EmployeePaginateResultDto(
      employees.map((employee) => employee.toJson()),
      filters,
      total,
    );
  }

  async findById(id: string): Promise<EmployeeResultDto> {
    const employee = await this.service.findById(id);
    return new EmployeeResultDto(employee.toJson());
  }

  async create(data: EmployeeCreateDto): Promise<EmployeeResultDto> {
    const employee = await this.service.create(data);
    return new EmployeeResultDto(employee.toJson());
  }

  async update(
    id: string,
    data: EmployeeUpdateDto,
  ): Promise<EmployeeResultDto> {
    const employee = await this.service.update(id, data);
    return new EmployeeResultDto(employee.toJson());
  }

  async destroy(id: string): Promise<DestroyResultDto> {
    await this.service.delete(id);
    return new DestroyResultDto();
  }
}
