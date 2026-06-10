import { AppError } from "../../../../shared/utils";
import { CloudinaryService } from "../../../upload/infrastructure/storage/cloudinary.storage";
import { CreateStoryDTO, Story } from "../../domain/entities/story.entity";
import { StoryRepository } from "../../domain/repository/story.repsitory";

export class CreateStoryUseCase {
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly uploadFileService: CloudinaryService,
  ) {}
  async execute(story: CreateStoryDTO) {
    if (!story.mediaUrl) {
      story.mediaUrl = null;
    } else {
      const existImage = await this.uploadFileService.exist(story.mediaUrl);
      if (!existImage) {
        throw new AppError("Image not found", 404, "not_found");
      }
    }
    const createStory = new Story(
      story.userId,
      story.type,
      story.mediaUrl,
      story.text,
      new Date(),
      new Date(Date.now() + 24 * 60 * 60 * 1000),
    );
    return this.storyRepo.create(createStory);
  }
}
