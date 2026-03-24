import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";
import { chatRouter } from "../../modules/chat/presentation/routes/chat.router";
import { profileRouter } from "../../modules/profile/presentation/routes/profile.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/profile", profileRouter);
export const apiRouter = router;
