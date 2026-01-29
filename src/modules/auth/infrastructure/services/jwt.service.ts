import { TokenService } from "../../domain/services/token.service";
import { config } from "../../../../config";
import jwt from "jsonwebtoken";

export class JwtService implements TokenService {
  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, config.token.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, config.token.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
  verifyAccessToken(token: string): string {
    return jwt.verify(token, config.token.ACCESS_TOKEN_SECRET) as string;
  }
  verifyRefreshToken(token: string): string {
    return jwt.verify(token, config.token.REFRESH_TOKEN_SECRET) as string;
  }
}
