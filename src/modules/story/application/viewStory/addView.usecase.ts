import { AppError } from "../../../../shared/utils";
import { StoryRepository } from "../../domain/repository/story.repsitory";
import { ViewStoryRepository } from "../../domain/repository/viewStory.repository";

export class AddViewUsecase {
  constructor(
    private readonly viewStoryRepo: ViewStoryRepository,
    private readonly storyRepo: StoryRepository,
  ) {}

  async execute(storyId: string, userId: string) {
    const story = await this.storyRepo.findById(storyId);
    if (!story) {
      throw new AppError("Story not found", 404, "NOT_FOUND");
    } else {
      if (story.userId === userId) {
        return "You cannot view your own story";
      }
      const existingView = await this.viewStoryRepo.getViewByStoryIdAndUserId(
        storyId,
        userId,
      );
      if (existingView) {
        return "You have already viewed this story";
      }
    }
    await this.viewStoryRepo.addView(storyId, userId);
    return "View added successfully";
  }
}
