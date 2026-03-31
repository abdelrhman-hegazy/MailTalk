import { Router } from "express";
import { profileModule } from "../../factories/profile.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { upload } from "../../../upload/presentation/middleware/uploadCloudinary.middleware";

const router = Router();
const ProfileController = profileModule();

router.get("", authMiddleware, ProfileController.getProfile);
router.put("", authMiddleware, ProfileController.updateProfile);
router.patch(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  ProfileController.updateAvatar,
);

export { router as profileRouter };
