import { TokenService } from "../../domain/services/token.service";
import { config } from "../../../../config";
import jwt from "jsonwebtoken";
import { AppError } from "../../../../shared/utils";

interface TokenPayload {
  userId: string;
}

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

  verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        config.token.ACCESS_TOKEN_SECRET,
      ) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new AppError(error.message, 401, "invalid_token");
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(
        token,
        config.token.REFRESH_TOKEN_SECRET,
      ) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new AppError(error.message, 401, "invalid_token");
    }
  }
}
