import { UserRepository } from "../../domain/repositories/user.repository";
import { JwtService } from "../../infrastructure/services/jwt.service";
import { AppError } from "../../../../shared/utils/AppError";
import { User } from "../../domain/entities/user.entity";
import { HashService } from "../../domain/services/hash.service";
export class VerificationUsecase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: JwtService,
    private hashService: HashService,
  ) {}

  async execute(email: string, code: string) {
    // TODO: Implement verification logic
    // 1. Verify the email
    const exists = await this.userRepo.findUserByEmail(email);
    if (!exists) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }
    if (exists.isVerified) {
      throw new AppError("User already verified", 400, "USER_ALREADY_VERIFIED");
    }
    // 2. Verify the verification code
    if (!exists.verificationCode) {
      throw new AppError(
        "No verification code found. Please request a new one.",
        400,
        "NO_VERIFICATION_CODE",
      );
    }

    const isVerified = await this.hashService.compare(
      code,
      exists.verificationCode,
    );
    console.log("///////////////");
    console.log(isVerified);
    console.log(exists.verificationCodeExpiry);
    console.log(new Date());
    if (!isVerified || exists.verificationCodeExpiry < new Date()) {
      throw new AppError(
        "Invalid verification code",
        400,
        "INVALID_VERIFICATION_CODE",
      );
    }
    // 3. Update user status to verified
    const user = new User(
      exists.id,
      exists.email,
      exists.name,
      exists.password,
      exists.provider,
      exists.providerId,
      true,
      exists.createdAt,
      null,
      null,
    );
    await this.userRepo.updateUser(user);
    // 4. Generate access and refresh tokens
    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);
    // 5. Return tokens
    return { accessToken, refreshToken };
  }
}
