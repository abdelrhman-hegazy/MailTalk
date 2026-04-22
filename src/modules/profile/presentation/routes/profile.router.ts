import { Router } from "express";
import { profileModule } from "../../factories/profile.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const profileController = profileModule();

router.get("", authMiddleware, profileController.getProfile);
router.put("", authMiddleware, profileController.updateProfile);

export { router as profileRouter };
