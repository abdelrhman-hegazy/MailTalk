import { AppError } from "../../../../shared/utils/AppError";
import { UserRepository } from "../../domain/repositories/user.repository";
import { HashService } from "../../domain/services/hash.service";
import { JwtService } from "../../infrastructure/services/jwt.service";

export class LoginUsecase {
  constructor(
    private userRepo: UserRepository,
    private tokenService: JwtService,
    private hashService: HashService,
  ) {}

  async execute(email: string, password: string) {
    // Find user by email
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new AppError("User Not Found", 404, "not_found");
    }
    // Check if password is correct
    const isPasswordCorrect = await this.hashService.compare(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new AppError("Invalid credentials", 401, "invalid_credentials");
    }
    // Generate token
    const accessToken = this.tokenService.generateAccessToken(user.id);
    const refreshToken = this.tokenService.generateRefreshToken(user.id);
    return { accessToken, refreshToken };
  }
}
