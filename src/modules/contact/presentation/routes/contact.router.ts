import { Router } from "express";
import { contactModule } from "../../factories/contact.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const contactController = contactModule();

router.post("", authMiddleware, contactController.addContact);

export { router as contactRouter };
