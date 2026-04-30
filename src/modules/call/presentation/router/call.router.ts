import { Router } from "express";
import { callModule } from "../../factories/call.factory";

const router = Router();
const callController = callModule();
router.post("", callController.getCalls);

export { router as callRouter };
