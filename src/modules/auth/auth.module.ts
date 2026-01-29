import { UserRepositoryPrisma } from "./infrastructure/repositories/user.repository.prisma";
// import { JwtService } from "./infrastructure/services/jwt.service";
import { BcryptService } from "./infrastructure/services/bcrypt.service";
import { NodemailerService } from "./infrastructure/services/nodemailer.service";
import { RegisterUsecase } from "./application/use-cases/register.usecase";
import { AuthController } from "./presentation/controllers/auth.controller";

export function AuthModule() {
  const userRepo = new UserRepositoryPrisma();
  const hashService = new BcryptService();
  //   const tokenService = new JwtService();
  const emailService = new NodemailerService();

  const register = new RegisterUsecase(userRepo, hashService, emailService);

  return new AuthController(register);
}
