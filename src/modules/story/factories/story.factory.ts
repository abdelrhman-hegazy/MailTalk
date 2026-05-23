import { CreateStoryUseCase } from "../application/createStory.usecase";
import { StoryRepositoryPrisma } from "../infrastructure/repository/story.repository.prisma";
import { StoryController } from "../presentation/controllers/story.controller";

export function storyModule() {
  const storyRepo = new StoryRepositoryPrisma();
  const createStoryUsecase = new CreateStoryUseCase(storyRepo);
  return new StoryController(createStoryUsecase);
}
