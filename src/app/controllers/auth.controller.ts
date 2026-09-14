import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Req,
  UseGuards,
} from "../../core";
import { AuthLoginDto, AuthTokenResultDto, EmployeeResultDto } from "../dtos";
import { AuthGuard } from "../guards/auth.guard";
import { IAuthService } from "../services";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE")
    private readonly service: IAuthService,
  ) {}

  @Post("login")
  async login(@Body() data: AuthLoginDto): Promise<AuthTokenResultDto> {
    return this.service.login(data);
  }

  @Post("validate")
  @UseGuards(AuthGuard)
  async validate(
    @Req("employeeId") employeeId: string,
  ): Promise<EmployeeResultDto> {
    return this.service.validate(employeeId);
  }

  @Post("refresh")
  async refresh(
    @Headers("authorization") authorization: string,
  ): Promise<AuthTokenResultDto> {
    return this.service.refresh(authorization);
  }
}
