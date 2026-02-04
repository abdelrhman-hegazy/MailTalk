import { UserRepositoryPrisma } from "./infrastructure/repositories/user.repository.prisma";
import { BcryptService } from "./infrastructure/services/bcrypt.service";
import { NodemailerService } from "./infrastructure/services/nodemailer.service";
import { RegisterUsecase } from "./application/use-cases/register.usecase";
import { AuthController } from "./presentation/controllers/auth.controller";
import { VerificationUsecase } from "./application/use-cases/verification.usecase";
import { JwtService } from "./infrastructure/services/jwt.service";
import { LoginUsecase } from "./application/use-cases/login.usecase";
import { RefreshTokenUsecase } from "./application/use-cases/refresh-token.usecase";
import { OAuthLoginUsecase } from "./application/use-cases/oauth-login.usecase";
import { GoogleOauthProvider } from "./infrastructure/services/oauth/google.provider";
import { FacebookOAuthProvider } from "./infrastructure/services/oauth/facebook.provider";

export function AuthModule() {
  const userRepo = new UserRepositoryPrisma();
  const hashService = new BcryptService();
  const tokenService = new JwtService();
  const emailService = new NodemailerService();

  const register = new RegisterUsecase(userRepo, hashService, emailService);

  const verification = new VerificationUsecase(
    userRepo,
    tokenService,
    hashService,
  );
  const login = new LoginUsecase(userRepo, tokenService, hashService);
  const refreshToken = new RefreshTokenUsecase(userRepo, tokenService);

  const oauthUseCases = () => {
    return {
      google: new OAuthLoginUsecase(
        new GoogleOauthProvider(),
        userRepo,
        tokenService,
      ),

      facebook: new OAuthLoginUsecase(
        new FacebookOAuthProvider(),
        userRepo,
        tokenService,
      ),
    };
  };

  return new AuthController(
    register,
    verification,
    login,
    refreshToken,
    oauthUseCases(),
  );
}
