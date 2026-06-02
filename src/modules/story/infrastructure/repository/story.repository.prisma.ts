import prisma from "../../../../lib/prisma";
import { Story, StoryReturn } from "../../domain/entities/story.entity";
import { StoryRepository } from "../../domain/repository/story.repsitory";
export class StoryRepositoryPrisma implements StoryRepository {
  async create(story: Story): Promise<StoryReturn> {
    const createStory = await prisma.story.create({
      data: story,
    });
    return createStory;
  }
  async delete(storyId: string): Promise<void> {
    await prisma.story.delete({
      where: {
        id: storyId,
      },
    });
  }
  async findById(storyId: string): Promise<StoryReturn | null> {
    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });
    return story;
  }
}
