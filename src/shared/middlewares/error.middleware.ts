import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { config } from "../../config";

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errorType = err.errorType || "INTERNAL_SERVER_ERROR";

  logger.error({ err, statusCode }, err.message);

  if (config.environment.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      errorType,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorType,
  });
};
