import { Story, StoryReturn } from "../entities/story.entity";

export interface StoryRepository {
  create(story: Story): Promise<StoryReturn>;
  delete(storyId: string): Promise<void>;
  findById(storyId: string): Promise<StoryReturn | null>;
  getStoriesByUserIds(userIds: string[]): Promise<StoryReturn[]>;
}
