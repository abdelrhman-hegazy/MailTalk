import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { conversationModule } from "../../factories/conversation.factory";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { createGroupSchema } from "../validator/chat.schema";

const router = Router();
const conversationController = conversationModule();
router.post(
  "/createGroup",
  authMiddleware,
  validate(createGroupSchema),
  conversationController.createGroup,
);
router.get(
  "/conversation",
  authMiddleware,
  conversationController.getConversations,
);
router.delete(
  "/conversation/:conversationId",
  authMiddleware,
  conversationController.deleteConversation,
);
export { router as conversationRouter };
