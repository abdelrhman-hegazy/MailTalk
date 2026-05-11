import { Router } from "express";
import { callModule } from "../../factories/call.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const callController = callModule();
router.post("", authMiddleware, callController.getCalls);

export { router as callRouter };
