import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { conversationModule } from "../../factories/conversation.factory";
import { upload } from "../../../upload/presentation/middleware/uploadCloudinary.middleware";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { createGroupSchema } from "../validator/chat.schema";

const router = Router();
const conversationController = conversationModule();
router.post(
  "/createGroup",
  authMiddleware,
  upload.single("image"),
  validate(createGroupSchema),
  conversationController.createGroup,
);
router.get(
  "/conversation",
  authMiddleware,
  conversationController.getConversations,
);

export { router as conversationRouter };
