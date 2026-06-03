import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { createStorySchema } from "../validator/story.schema";
import { storyModule } from "../../factories/story.factory";
import { viewStoryModule } from "../../factories/viewStory";

const router = Router();
const storyController = viewStoryModule();

router.get(
  "/others",
  authMiddleware,
  storyController.viewStoryOthers
);

export { router as viewStoryRouter };