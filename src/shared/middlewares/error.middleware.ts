import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { config } from "../../config";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorType = "INTERNAL_SERVER_ERROR";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorType = err.errorType;
  }

  logger.error(
    {
      err,
      statusCode,
    },
    err.message,
  );

  if (config.enviroment.NODE_ENV === "development") {
    return res.status(statusCode).json({
      success: false,
      message,
      errorType,
      stack: err instanceof Error ? err.stack : undefined,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorType,
  });
};
