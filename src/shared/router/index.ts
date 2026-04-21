import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";
import { messageRouter } from "../../modules/chat/presentation/routes/message.router";
import { profileRouter } from "../../modules/profile/presentation/routes/profile.router";
import { conversationRouter } from "../../modules/chat/presentation/routes/conversation.router";
import { uploadRouter } from "../../modules/upload/presentation/router/upload.router";
import { searchRouter } from "../../modules/search/presentation/routes/search.router";

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/chat", messageRouter);
router.use("/chat", conversationRouter);
router.use("/search", searchRouter);

export const apiRouter = router;
