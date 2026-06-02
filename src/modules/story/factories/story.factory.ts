import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { CreateStoryUseCase } from "../application/createStory.usecase";
import { DeleteStoryUsecase } from "../application/deleteStory.usecase";
import { StoryRepositoryPrisma } from "../infrastructure/repository/story.repository.prisma";
import { StoryController } from "../presentation/controllers/story.controller";

export function storyModule() {
  const storyRepo = new StoryRepositoryPrisma();
  const uploadFile = new CloudinaryService();
  const createStoryUsecase = new CreateStoryUseCase(storyRepo, uploadFile);
  const deleteStoryUsecase = new DeleteStoryUsecase(storyRepo, uploadFile);
  return new StoryController(createStoryUsecase, deleteStoryUsecase);
}
