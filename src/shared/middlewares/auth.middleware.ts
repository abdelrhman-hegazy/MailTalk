import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../modules/auth/infrastructure/services/jwt.service";
import { AppError } from "../utils";

export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
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

    next();
  } catch (error) {
    throw new AppError(error.message, 401, "Unauthorized");
  }
};
