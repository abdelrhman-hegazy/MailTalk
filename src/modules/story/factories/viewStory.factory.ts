import { AddViewUsecase } from "../application/viewStory/addView.usecase";
import { GetViewersUsecase } from "../application/viewStory/getViewers.usecase";
import { StoryRepositoryPrisma } from "../infrastructure/repository/story.repository.prisma";
import { ViewStoryRepositoryPrisma } from "../infrastructure/repository/viewStory.repository.prisma";
import { ViewStoryController } from "../presentation/controllers/viewStory.controller";

export function viewStoryModule() {
  const storyRepo = new StoryRepositoryPrisma();
  const viewStoryRepo = new ViewStoryRepositoryPrisma();
  const addViewUsecase = new AddViewUsecase(viewStoryRepo, storyRepo);
  const getViewersUsecase = new GetViewersUsecase(viewStoryRepo, storyRepo);
  return new ViewStoryController(getViewersUsecase, addViewUsecase);
}
