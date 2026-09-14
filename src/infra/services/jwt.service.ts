import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../../common/exceptions";
import { Injectable } from "../../core";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1d";

@Injectable()
export class JwtService {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });
  }

  verify<T extends object = any>(token: string): T {
    try {
      return jwt.verify(token, JWT_SECRET) as T;
    } catch {
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }
}
