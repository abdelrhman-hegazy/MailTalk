import express from "express";
import {
  registerSchema,
  verificationSchema,
  loginSchema,
} from "../validators/auth.schema";
import { AuthModule } from "../../auth.module";
import { validate } from "../../../../shared/middlewares/validate.middleware";
const router = express.Router();

const authController = AuthModule();

router.post("/register", validate(registerSchema), authController.register);

router.post(
  "/verify",
  validate(verificationSchema),
  authController.verification,
);
router.post("/login", validate(loginSchema), authController.login);

export { router as authRouter };
