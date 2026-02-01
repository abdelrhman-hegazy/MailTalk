import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  logger.info(
    {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    },
    "Incoming request",
  );

  next();
};
