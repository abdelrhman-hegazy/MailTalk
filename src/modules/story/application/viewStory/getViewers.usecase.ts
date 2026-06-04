import { ViewStoryRepository } from "../../domain/repository/viewStory.repository";
import { StoryRepository } from "../../domain/repository/story.repsitory";
import { AppError } from "../../../../shared/utils";

export class GetViewersUsecase {
  constructor(
    private readonly viewStoryRepo: ViewStoryRepository,
    private readonly storyRepo: StoryRepository,
  ) {}

  async execute(storyId: string, userId: string) {
    const story = await this.storyRepo.findById(storyId);
    if (!story) {
      throw new AppError("Story not found", 404, "NOT_FOUND");
    }
    if (story.userId !== userId) {
      throw new AppError(
        "You are not the owner of this story",
        403,
        "UNAUTHORIZED",
      );
    }
    const views = await this.viewStoryRepo.getViewsByStoryId(storyId);
    return views;
  }
}
