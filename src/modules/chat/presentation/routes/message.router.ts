import { Router } from "express";
import { messageModule } from "../../factories/message.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const messageController = messageModule();

router.post("/message/send", authMiddleware, messageController.sendMessage);
router.get("/messages", authMiddleware, messageController.getMessages);
export { router as messageRouter };
