import { compare } from "bcrypt";
import type { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "../../../common/exceptions";
import { Inject, Injectable } from "../../../core";
import { IEmployeeService as IEmployeeInfraService } from "../../../infra/services";
import { AuthLoginDto, AuthTokenResultDto, EmployeeResultDto } from "../../dtos";
import { JwtService } from "../shared";
import { IAuthService } from "./auth.interface";
import { IEmployeeService } from "../employee";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("EMPLOYEE_INFRA_SERVICE")
    private readonly employeeInfraService: IEmployeeInfraService,
    @Inject("EMPLOYEE_SERVICE")
    private readonly employeeService: IEmployeeService,
    @Inject(JwtService)
    private readonly jwt: JwtService,
  ) {}

  async login(data: AuthLoginDto): Promise<AuthTokenResultDto> {
    const employee = await this.employeeInfraService.findByEmail(data.email);
    if (!employee || !(await compare(data.password, employee.password))) {
      throw new UnauthorizedException("E-mail ou senha inválidos");
    }

    const token = this.jwt.sign({
      sub: employee.id,
      email: employee.email,
      companyId: employee.companyId,
    });
    return new AuthTokenResultDto(token);
  }

  async validate(employeeId: string): Promise<EmployeeResultDto> {
    return this.employeeService.findById(employeeId);
  }

  async refresh(authorization?: string): Promise<AuthTokenResultDto> {
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token não informado");
    }

    const oldToken = authorization.slice("Bearer ".length);
    const payload = this.jwt.verify<JwtPayload>(oldToken);
    const token = this.jwt.sign({
      sub: payload.sub,
      email: payload.email,
      companyId: payload.companyId,
    });
    return new AuthTokenResultDto(token);
  }
}
