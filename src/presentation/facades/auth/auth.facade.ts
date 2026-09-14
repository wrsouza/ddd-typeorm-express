import { compare } from "bcrypt";
import type { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "../../../common/exceptions";
import { Inject, Injectable } from "../../../core";
import { IEmployeeApplicationService } from "../../../application/services";
import { AuthLoginDto, AuthTokenResultDto, EmployeeResultDto } from "../../dtos";
import { JwtService } from "../../../infra/services";
import { IAuthFacade } from "./auth.interface";
import { IEmployeeFacade } from "../employee";

@Injectable()
export class AuthFacade implements IAuthFacade {
  constructor(
    @Inject("EMPLOYEE_APPLICATION_SERVICE")
    private readonly employeeApplicationService: IEmployeeApplicationService,
    @Inject("EMPLOYEE_FACADE")
    private readonly employeeFacade: IEmployeeFacade,
    @Inject(JwtService)
    private readonly jwt: JwtService,
  ) {}

  async login(data: AuthLoginDto): Promise<AuthTokenResultDto> {
    const employee = await this.employeeApplicationService.findByEmail(data.email);
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
    return this.employeeFacade.findById(employeeId);
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
