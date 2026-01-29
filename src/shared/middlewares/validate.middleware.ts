import z, { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const validate =
  <T extends ZodRawShape>(schema: ZodObject<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(error.message, 400, "VALIDATION_ERROR");
      }
      next(error);
    }
  };
