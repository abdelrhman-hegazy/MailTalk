import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { createStorySchema } from "../validator/story.schema";
import { storyModule } from "../../factories/story.factory";

const router = Router();
const storyController = storyModule();

router.post(
  "/create",
  validate(createStorySchema),
  authMiddleware,
  storyController.createStory,
);

export { router as storyRouter };
