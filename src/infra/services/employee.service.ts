import { NotFoundException } from "../../common/exceptions";
import { Inject, Injectable } from "../../core";
import { IEmployee } from "../../domain";
import { IEmployeeEntity } from "../entities";
import { IEmployeeMapper } from "../mappers";
import { IEmployeeFilter, IEmployeeRepository } from "../repositories";
import { IEmployeeService } from "./interfaces";

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @Inject("EMPLOYEE_REPOSITORY")
    private readonly employeeRepository: IEmployeeRepository,
    @Inject("EMPLOYEE_MAPPER")
    private readonly employeeMapper: IEmployeeMapper,
  ) {}

  async paginate(filters: IEmployeeFilter): Promise<[IEmployee[], number]> {
    const [employees, total] = await this.employeeRepository.paginate(filters);
    const employeesMapped = employees.map((company) =>
      this.employeeMapper.toDomain(company),
    );
    return [employeesMapped, total];
  }

  async findById(id: string): Promise<IEmployee> {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new NotFoundException("employee not found");
    }
    return this.employeeMapper.toDomain(employee);
  }

  async create(data: Partial<IEmployeeEntity>): Promise<IEmployee> {
    const employee = await this.employeeRepository.create(data);
    return this.employeeMapper.toDomain(employee);
  }

  async update(id: string, data: Partial<IEmployeeEntity>): Promise<IEmployee> {
    const employee = await this.employeeRepository.update(id, data);
    return this.employeeMapper.toDomain(employee);
  }

  async delete(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  // Retorna a entidade crua (com password) para uso exclusivo em autenticação;
  // o mapper não expõe password ao converter para o domínio.
  async findByEmail(email: string): Promise<IEmployeeEntity | null> {
    return this.employeeRepository.findByEmail(email);
  }
}
