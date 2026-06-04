import { ContactRepositoryPrisma } from "../../contact/infrastructure/repository/contact.repository.prisma";
import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { CreateStoryUseCase } from "../application/story/createStory.usecase";
import { DeleteStoryUsecase } from "../application/story/deleteStory.usecase";
import { GetStoriesUsecase } from "../application/story/getStories.usecase";
import { GetStoryUsecase } from "../application/story/getStory.usecase";
import { StoryRepositoryPrisma } from "../infrastructure/repository/story.repository.prisma";
import { StoryController } from "../presentation/controllers/story.controller";

export function storyModule() {
  const contactRepo = new ContactRepositoryPrisma();
  const storyRepo = new StoryRepositoryPrisma();
  const uploadFile = new CloudinaryService();
  const createStoryUsecase = new CreateStoryUseCase(storyRepo, uploadFile);
  const deleteStoryUsecase = new DeleteStoryUsecase(storyRepo, uploadFile);
  const getStoriesUsecase = new GetStoriesUsecase(storyRepo, contactRepo);
  const getStoryUsecase = new GetStoryUsecase(storyRepo, contactRepo);
  return new StoryController(
    createStoryUsecase,
    deleteStoryUsecase,
    getStoriesUsecase,
    getStoryUsecase,
  );
}
