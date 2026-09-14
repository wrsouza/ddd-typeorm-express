import { AuthLoginDto, AuthTokenResultDto, EmployeeResultDto } from "../../dtos";

export interface IAuthFacade {
  login(data: AuthLoginDto): Promise<AuthTokenResultDto>;
  validate(employeeId: string): Promise<EmployeeResultDto>;
  refresh(authorization?: string): Promise<AuthTokenResultDto>;
}
