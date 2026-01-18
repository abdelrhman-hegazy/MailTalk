import express, { Express } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { requestLogger } from "./shared/middlewares/requestLogger";
import { AppError } from "./shared/errors/AppError";

const app: Express = express();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use("/api/v1/health", (_req, res, next) => {
  if (true) {
    next(new AppError("fazloka", 400, "FAZLOKA"));
  }
  res.status(200).send("Chatbox is running");
});

// Error handling middleware should be the last middleware
app.use(errorHandler);

export default app;
