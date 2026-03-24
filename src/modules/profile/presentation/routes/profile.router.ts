import { Router } from "express";
import { profileModule } from "../../factories/profile.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const ProfileController = profileModule();

router.get("", authMiddleware, ProfileController.getProfile);

export { router as profileRouter };
