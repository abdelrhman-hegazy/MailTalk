import { AppError } from "../../../../shared/utils";
import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "../../infrastructure/services/jwt.service";

export class RefreshTokenUsecase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: JwtService,
  ) {}

  async execute(refreshToken: string) {
    // Verify and decode the refresh token
    const tokenData = this.tokenService.verifyRefreshToken(refreshToken);

    // Find user by ID from token
    const user = await this.userRepo.findById(tokenData.userId);
    if (!user) {
      throw new AppError("User not found", 404, "not_found");
    }

    // Validate that the refresh token matches the one stored in DB
    if (user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 401, "invalid_token");
    }

    // Generate new access token
    const accessToken = this.tokenService.generateAccessToken(user.id);
    const newRefreshToken = this.tokenService.generateRefreshToken(user.id);

    user.refreshToken = newRefreshToken;
    await this.userRepo.updateUser(user);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
