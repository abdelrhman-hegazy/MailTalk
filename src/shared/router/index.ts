import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";
import { chatRouter } from "../../modules/chat/presentation/routes/chat.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chat", chatRouter);

export const apiRouter = router;
