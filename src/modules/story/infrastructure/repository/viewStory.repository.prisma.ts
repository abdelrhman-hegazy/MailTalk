import { ViewStoryRepository } from "../../domain/repository/viewStory.repository";
import prisma from "../../../../lib/prisma";

export class ViewStoryRepositoryPrisma implements ViewStoryRepository {
  async addView(storyId: string, userId: string) {
    await prisma.storyView.create({
      data: {
        storyId,
        viewerId: userId,
        viewedAt: new Date(),
      },
    });
  }

  async getViewByStoryIdAndUserId(storyId: string, userId: string) {
    const view = await prisma.storyView.findUnique({
      where: {
        storyId_viewerId: {
          storyId,
          viewerId: userId,
        },
      },
    });
    return view;
  }

  async getViewsByStoryId(storyId: string) {
    const views = await prisma.storyView.findMany({
      where: {
        storyId,
      },
    });
    return views;
  }
}
