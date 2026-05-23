import express from "express";
import { authRouter } from "../../modules/auth/presentation/routes/auth.router";
import { messageRouter } from "../../modules/chat/presentation/routes/message.router";
import { profileRouter } from "../../modules/profile/presentation/routes/profile.router";
import { conversationRouter } from "../../modules/chat/presentation/routes/conversation.router";
import { uploadRouter } from "../../modules/upload/presentation/router/upload.router";
import { contactRouter } from "../../modules/contact/presentation/routes/contact.router";
import { callRouter } from "../../modules/call/presentation/router/call.router";
import { storyRouter } from "../../modules/story/presentation/routes/story.router";

const router = express.Router();

router.use("/upload", uploadRouter);
router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/chat", messageRouter);
router.use("/chat", conversationRouter);
router.use("/contact", contactRouter);
router.use("/call", callRouter);
router.use("/story", storyRouter);

export const apiRouter = router;
