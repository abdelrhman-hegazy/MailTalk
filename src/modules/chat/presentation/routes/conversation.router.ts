import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { conversationModule } from "../../factories/conversation.factory";
import { upload } from "../../../../shared/middlewares/uploadCloudinary.middleware";

const router = Router();
const conversationController = conversationModule();
router.post(
  "/createGroup",
  authMiddleware,
  upload.single("image"),
  conversationController.createGroup,
);
router.get(
  "/conversation",
  authMiddleware,
  conversationController.getConversations,
);

export { router as conversationRouter };
