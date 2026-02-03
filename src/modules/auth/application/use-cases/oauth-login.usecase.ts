import { AppError } from "../../../../shared/utils";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { OAuthProvider } from "../../domain/services/oauth-provider.service";
import { JwtService } from "../../infrastructure/services/jwt.service";

interface OAuthProfile {
  email: string;
  name: string;
  providerId: string;
  provider: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class OAuthLoginUsecase {
  constructor(
    private readonly provider: OAuthProvider,
    private readonly userRepo: UserRepository,
    private readonly tokenService: JwtService,
  ) {}

  async execute(idToken: string): Promise<AuthTokens> {
    const profile = await this.getAndValidateProfile(idToken);
    await this.validateEmailUniqueness(profile);

    const user = await this.findOrCreateUser(profile);
    const tokens = this.generateTokens(user.id);

    await this.updateUserRefreshToken(user, tokens.refreshToken);

    return tokens;
  }

  private async getAndValidateProfile(idToken: string): Promise<OAuthProfile> {
    const profile = await this.provider.getProfile(idToken);

    if (!profile.email || !profile.providerId || !profile.name) {
      throw new AppError(
        "Incomplete profile data from OAuth provider",
        400,
        "invalid_oauth_profile",
      );
    }

    return profile as OAuthProfile;
  }

  private async validateEmailUniqueness(profile: OAuthProfile): Promise<void> {
    const existingUser = await this.userRepo.findUserByEmail(profile.email);

    if (existingUser && existingUser.provider !== profile.provider) {
      throw new AppError(
        `An account with this email already exists using ${existingUser.provider}`,
        409,
        "email_already_registered",
      );
    }
  }

  private async findOrCreateUser(profile: OAuthProfile): Promise<User> {
    let user = await this.userRepo.findByProvider(
      profile.provider,
      profile.providerId,
    );

    if (!user) {
      user = this.createUserFromProfile(profile);
      await this.userRepo.createUser(user);
    }

    return user;
  }

  private createUserFromProfile(profile: OAuthProfile): User {
    return new User(
      crypto.randomUUID(),
      profile.email,
      profile.name,
      null, // password
      profile.provider,
      profile.providerId,
      true, // isEmailVerified
      new Date(),
      null, // refreshToken - will be set later
      null,
      null,
    );
  }

  private generateTokens(userId: string): AuthTokens {
    return {
      accessToken: this.tokenService.generateAccessToken(userId),
      refreshToken: this.tokenService.generateRefreshToken(userId),
    };
  }

  private async updateUserRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<void> {
    user.refreshToken = refreshToken;
    await this.userRepo.updateUser(user);
  }
}
