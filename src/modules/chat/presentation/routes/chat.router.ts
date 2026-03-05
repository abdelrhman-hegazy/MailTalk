import { Router } from "express";
import { ChatModule } from "../../factories/sendMessage.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const ChatController = ChatModule();

router.post("/send", authMiddleware, ChatController.sendMessage);

export { router as chatRouter };
