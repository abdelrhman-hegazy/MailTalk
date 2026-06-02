import { AppError } from "../../../shared/utils";
import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { StoryRepository } from "../domain/repository/story.repsitory";

export class DeleteStoryUsecase {
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly uploadFileService: CloudinaryService,
  ) {}
  async execute(storyId: string) {
    const story = await this.storyRepo.findById(storyId);
    if (!story) {
      throw new AppError("Story not found", 404, "not_found");
    }
    if (story.mediaUrl) {
      await this.uploadFileService.delete(story.mediaUrl);
    }
    
    await this.storyRepo.delete(storyId);
  }
}
