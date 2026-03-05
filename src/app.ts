import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middlewares/error.middleware";
import { requestLogger } from "./shared/middlewares/requestLogger";
import { initSocket } from "./shared/socket/socket.server";
import { createServer } from "http";
import { apiRouter } from "./shared/router";

const app: Express = express();

const server = createServer(app);

initSocket(server);

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

app.use("/api/v1", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome to the MailTalk API." });
});

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export { server };
