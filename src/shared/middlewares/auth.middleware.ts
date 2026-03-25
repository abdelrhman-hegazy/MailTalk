import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../modules/auth/infrastructure/services/jwt.service";
import { AppError } from "../utils";
import { UserRepositoryPrisma } from "../../modules/auth/infrastructure/repositories/user.repository.prisma";
const userRepository = new UserRepositoryPrisma();
export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Unauthorized - No token provided",
        401,
        "Unauthorized",
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = new JwtService().verifyAccessToken(token);
    req.user = { id: decoded.userId };
    const user = await userRepository.findById(decoded.userId);
    if (!user) {
      throw new AppError("User not found", 404, "Not Found");
    }
    next();
  } catch (error) {
    next(error);
  }
};
