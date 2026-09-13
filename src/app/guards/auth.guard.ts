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
    const request = context.getRequest();
    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token não informado");
    }

    const token = authorization.slice("Bearer ".length);
    const payload = this.jwt.verify<JwtPayload>(token);
    request.headers.set("employeeId", String(payload.sub));
    return true;
  }
}
