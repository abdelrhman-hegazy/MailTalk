import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { CreateStoryUseCase } from "../../application/createStory.usecase";
import { DeleteStoryUsecase } from "../../application/deleteStory.usecase";
import { Request, Response } from "express";

export class StoryController {
  constructor(
    private createStoryUsecase: CreateStoryUseCase,
    private deleteStoryUsecase: DeleteStoryUsecase,
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
}
