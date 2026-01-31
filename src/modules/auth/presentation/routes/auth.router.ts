import express from "express";
import { registerSchema, verificationSchema } from "../validators/auth.schema";
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

export { router as authRouter };
