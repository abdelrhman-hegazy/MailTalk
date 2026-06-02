import { Router } from "express";
import { contactModule } from "../../factories/contact.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const contactController = contactModule();

router.post("/:contactId", authMiddleware, contactController.addContact);
router.get("", authMiddleware, contactController.getContacts);
router.delete("/:contactId", authMiddleware, contactController.deleteContact);

export { router as contactRouter };
