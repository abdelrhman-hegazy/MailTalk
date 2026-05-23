import { Story, StoryReturn } from "../entities/story.entity";

export interface StoryRepository {
  create(story: Story): Promise<StoryReturn>;
}
