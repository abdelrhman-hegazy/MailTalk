import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { Request, Response } from "express";
import { CreateStoryUseCase } from "../../application/story/createStory.usecase";
import { DeleteStoryUsecase } from "../../application/story/deleteStory.usecase";
import { GetStoriesUsecase as GetStoriesUsecase } from "../../application/story/getStories.usecase";
import { GetStoryUsecase } from "../../application/story/getStory.usecase";

export class StoryController {
  constructor(
    private createStoryUsecase: CreateStoryUseCase,
    private deleteStoryUsecase: DeleteStoryUsecase,
    private getStoriesUsecase: GetStoriesUsecase,
    private getStoryUsecase: GetStoryUsecase,
  ) {}

  createStory = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const story = { ...req.body, userId: id };
    const result = await this.createStoryUsecase.execute(story);
    sendResponse(res, {
      statusCode: 201,
      message: "Story created successfully",
      data: result,
    });
  });
  deleteStory = catchAsync(async (req: Request, res: Response) => {
    const storyId = req.params.id;
    if (typeof storyId !== "string") {
      throw new Error("Story ID must be a string");
    }
    await this.deleteStoryUsecase.execute(storyId);
    sendResponse(res, {
      statusCode: 200,
      message: "Story deleted successfully",
    });
  });
  getStories = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const result = await this.getStoriesUsecase.execute(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Story others fetched successfully",
      data: result,
    });
  });
  getStory = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const storyId = req.params.id;
    if (typeof storyId !== "string") {
      throw new Error("Story ID must be a string");
    }
    const result = await this.getStoryUsecase.execute(storyId, id);
    sendResponse(res, {
      statusCode: 200,
      message: "Story fetched successfully",
      data: result,
    });
  });
}
