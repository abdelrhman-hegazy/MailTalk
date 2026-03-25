import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";
<<<<<<< Updated upstream
import { chatRouter } from "../../modules/chat/presentation/routes/chat.router";
=======
import { chatRouter } from "../../modules/chat/presentation/routes/message.router";
import { profileRouter } from "../../modules/profile/presentation/routes/profile.router";
>>>>>>> Stashed changes

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chat", chatRouter);

export const apiRouter = router;
