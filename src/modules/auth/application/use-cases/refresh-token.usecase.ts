import { AppError } from "../../../../shared/utils";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "../../infrastructure/services/jwt.service";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenUsecase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenService: JwtService,
  ) {}

  async execute(refreshToken: string): Promise<AuthTokens> {
    this.validateRefreshToken(refreshToken);

    const tokenPayload = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.getUserAndValidateToken(
      tokenPayload.userId,
      refreshToken,
    );

    const newTokens = this.generateNewTokens(user.id);
    await this.updateUserRefreshToken(user, newTokens.refreshToken);

    return newTokens;
  }

  private validateRefreshToken(refreshToken: string): void {
    if (
      !refreshToken ||
      typeof refreshToken !== "string" ||
      refreshToken.trim() === ""
    ) {
      throw new AppError("Refresh token is required", 400, "missing_token");
    }
  }

  private async getUserAndValidateToken(userId: string, refreshToken: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new AppError("User not found", 401, "invalid_token");
    }

    if (!user.refreshToken) {
      throw new AppError("No active refresh token found", 401, "invalid_token");
    }
    if (user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 401, "invalid_token");
    }

    return user;
  }

  private generateNewTokens(userId: string): AuthTokens {
    return {
      accessToken: this.tokenService.generateAccessToken(userId),
      refreshToken: this.tokenService.generateRefreshToken(userId),
    };
  }

  private async updateUserRefreshToken(
    user: User,
    newRefreshToken: string,
  ): Promise<void> {
    user.refreshToken = newRefreshToken;
    await this.userRepo.updateUser(user);
  }
}
