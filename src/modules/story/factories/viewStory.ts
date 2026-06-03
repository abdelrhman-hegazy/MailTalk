import { ContactRepositoryPrisma } from "../../contact/infrastructure/repository/contact.repository.prisma";
import { GetStoryOthersUsecase } from "../application/view/getStoryOthers.usecase";
import { StoryRepositoryPrisma } from "../infrastructure/repository/story.repository.prisma";
import { ViewStoryController } from "../presentation/controllers/viewStory.controller";

export function viewStoryModule() {
  const storyRepo = new StoryRepositoryPrisma();
  const contactRepo = new ContactRepositoryPrisma();
  const getStoryOthersUsecase = new GetStoryOthersUsecase(storyRepo, contactRepo);
  return new ViewStoryController(getStoryOthersUsecase);
}
