import type { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "../../common/exceptions";
import {
  type CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "../../core";
import { JwtService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService)
    private readonly jwt: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.getRequest() as Request & { employeeId?: string };
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token não informado");
    }

    const token = authorization.slice("Bearer ".length);
    const payload = this.jwt.verify<JwtPayload>(token);
    request.employeeId = String(payload.sub);
    return true;
  }
}
