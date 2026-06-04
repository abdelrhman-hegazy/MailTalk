import { StoryView } from "../entities/viewStory.entity";

export interface ViewStoryRepository {
  addView(storyId: string, userId: string): Promise<void>;
  getViewByStoryIdAndUserId(
    storyId: string,
    userId: string,
  ): Promise<StoryView | null>;
  getViewsByStoryId(storyId: string): Promise<StoryView[]>;
}
