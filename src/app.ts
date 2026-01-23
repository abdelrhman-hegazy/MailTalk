import express, { Express } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { requestLogger } from "./shared/middlewares/requestLogger";

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

// Error handling middleware should be the last middleware
app.use(errorHandler);

export default app;
