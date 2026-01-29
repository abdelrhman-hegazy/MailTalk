import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";

const router = express.Router();

router.use("/auth", authRouter);

export const apiRouter = router;
