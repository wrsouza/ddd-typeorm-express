import {
  DestroyResultDto,
  EmployeeCreateDto,
  EmployeePaginateDto,
  EmployeePaginateResultDto,
  EmployeeResultDto,
  EmployeeUpdateDto,
} from "../../dtos";

export interface IEmployeeService {
  paginate(params: EmployeePaginateDto): Promise<EmployeePaginateResultDto>;
  findById(id: string): Promise<EmployeeResultDto>;
  create(data: EmployeeCreateDto): Promise<EmployeeResultDto>;
  update(id: string, data: EmployeeUpdateDto): Promise<EmployeeResultDto>;
  destroy(id: string): Promise<DestroyResultDto>;
}
