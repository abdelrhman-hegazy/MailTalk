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

router.delete("/delete/:id", authMiddleware, storyController.deleteStory);

router.get("/all", authMiddleware, storyController.getStories);

router.get("/:id", authMiddleware, storyController.getStory);

export { router as storyRouter };
