import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "../../infrastructure/services/jwt.service";
import { AppError } from "../../../../shared/utils";
import { User } from "../../domain/entities/user.entity";
import { HashService } from "../../domain/services/hash.service";

export class VerificationUsecase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: JwtService,
    private hashService: HashService,
  ) {}

  async execute(email: string, code: string) {
    // 1. Find and validate user exists
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404, "not_found");
    }

    // 2. Check if already verified
    if (user.isVerified) {
      throw new AppError("User already verified", 400, "already_verified");
    }

    // 3. Validate verification code exists
    if (!user.verificationCode) {
      throw new AppError(
        "No verification code found. Please request a new one.",
        400,
        "no_verification_code",
      );
    }

    // 4. Check code expiry first (before expensive hash comparison)
    if (user.verificationCodeExpiry < new Date()) {
      throw new AppError("Verification code has expired", 400, "expired_code");
    }

    // 5. Verify the code
    const isCodeValid = await this.hashService.compare(
      code,
      user.verificationCode,
    );
    if (!isCodeValid) {
      throw new AppError("Invalid verification code", 400, "invalid_code");
    }

    // 6. Generate tokens
    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);

    // 7. Update user to verified and clear verification data
    const verifiedUser = new User(
      user.id,
      user.email,
      user.name,
      user.password,
      user.provider,
      user.providerId,
      true, // isVerified
      user.createdAt,
      null, // verificationCode - cleared after successful verification
      null, // verificationCodeExpiry - cleared after successful verification
      refreshToken,
    );

    await this.userRepo.updateUser(verifiedUser);

    return { accessToken, refreshToken };
  }
}
