import { Router } from "express";
import { upload } from "../middleware/uploadCloudinary.middleware";
import { uploadModule } from "../../factories/upload.factory";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";

const router = Router();
const uploadController = uploadModule();

router.post(
  "",
  upload.single("file"),
  authMiddleware,
  uploadController.uploadFile,
);

export { router as uploadRouter };
