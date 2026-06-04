import { ContactRepository } from "../../../contact/domain/repository/contact.repository";
import { StoryRepository } from "../../domain/repository/story.repsitory";

export class GetStoriesUsecase {
  constructor(
    private readonly storyRepo: StoryRepository,
    private readonly contactRepo: ContactRepository,
  ) {}

  async execute(userId: string) {
    const contacts = await this.contactRepo.getContactsMe(userId);

    const contactsHasStory: string[] = [];
    for (const contact of contacts) {
      const isExists = await this.contactRepo.isContactExists(contact, userId);
      if (isExists) {
        contactsHasStory.push(contact);
      }
    }
    const storyOthers =
      await this.storyRepo.getStoriesByUserIds(contactsHasStory);
    const storyMy = await this.storyRepo.getStoryByUserId(userId);

    return {
      others: storyOthers,
      my: storyMy,
    };
  }
}
