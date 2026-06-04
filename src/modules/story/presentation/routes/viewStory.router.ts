import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { viewStoryModule } from "../../factories/viewStory.factory";

const router = Router();
const storyController = viewStoryModule();

router.post("/:id/view", authMiddleware, storyController.addView);

router.get("/:id/viewers", authMiddleware, storyController.getViewers);

export { router as viewStoryRouter };
