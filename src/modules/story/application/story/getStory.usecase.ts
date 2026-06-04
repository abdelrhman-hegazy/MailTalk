import { AppError } from "../../../../shared/utils";
import { ContactRepository } from "../../../contact/domain/repository/contact.repository";
import { StoryRepository } from "../../domain/repository/story.repsitory";

export class GetStoryUsecase {
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly contactRepo: ContactRepository,
  ) {}

  async execute(storyId: string, userId: string) {
    const story = await this.storyRepo.findById(storyId);
    if (!story) {
      throw new AppError("Story not found", 404, "NOT_FOUND");
    }
    if (story.userId === userId) {
      return story;
    }
    const isExist = await this.contactRepo.isContactExists(
      story.userId,
      userId,
    );
    if (!isExist) {
      throw new AppError("Story not found", 404, "NOT_FOUND");
    }
    return story;
  }
}
