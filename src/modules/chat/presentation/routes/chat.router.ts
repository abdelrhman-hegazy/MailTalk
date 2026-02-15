import { Router } from "express";
import { ChatModule } from "../../factories/sendMessage.factory";

const router = Router();
const ChatController = ChatModule();

router.post("/send", ChatController.sendMessage);

export { router as chatRouter };
