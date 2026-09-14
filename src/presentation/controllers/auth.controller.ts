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
import { IAuthFacade } from "../facades";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_FACADE")
    private readonly facade: IAuthFacade,
  ) {}

  @Post("login")
  async login(@Body() data: AuthLoginDto): Promise<AuthTokenResultDto> {
    return this.facade.login(data);
  }

  @Post("validate")
  @UseGuards(AuthGuard)
  async validate(
    @Req("employeeId") employeeId: string,
  ): Promise<EmployeeResultDto> {
    return this.facade.validate(employeeId);
  }

  @Post("refresh")
  async refresh(
    @Headers("authorization") authorization: string,
  ): Promise<AuthTokenResultDto> {
    return this.facade.refresh(authorization);
  }
}
