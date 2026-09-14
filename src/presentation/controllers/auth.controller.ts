import {
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Req,
  UseGuards,
} from "../../core";
import {
  AuthLoginDto,
  authLoginSchema,
  AuthTokenResultDto,
  EmployeeResultDto,
} from "../dtos";
import { AuthGuard } from "../guards/auth.guard";
import { IAuthFacade } from "../facades";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "../decorators";
import { authTokenResultSchema, dataEnvelopeSchema } from "../swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_FACADE")
    private readonly facade: IAuthFacade,
  ) {}

  @Post("login")
  @ApiOperation({ summary: "Log in with email and password" })
  @ApiBody({ schema: authLoginSchema })
  @ApiResponse({
    status: 200,
    description: "JWT access token",
    schema: authTokenResultSchema,
  })
  async login(@Body() data: AuthLoginDto): Promise<AuthTokenResultDto> {
    return this.facade.login(data);
  }

  @Post("validate")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Validate the current session token" })
  @ApiResponse({
    status: 200,
    description: "Employee tied to the token",
    schema: dataEnvelopeSchema,
  })
  async validate(
    @Req("employeeId") employeeId: string,
  ): Promise<EmployeeResultDto> {
    return this.facade.validate(employeeId);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh an access token" })
  @ApiResponse({
    status: 200,
    description: "New JWT access token",
    schema: authTokenResultSchema,
  })
  async refresh(
    @Headers("authorization") authorization: string,
  ): Promise<AuthTokenResultDto> {
    return this.facade.refresh(authorization);
  }
}
