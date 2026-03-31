import z, { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils";
export const validate =
  <T extends ZodRawShape>(schema: ZodObject<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      console.log("Received body:", req.body);
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new AppError(error.message, 400, "validation_error");
      }
      next(error);
    }
  };
