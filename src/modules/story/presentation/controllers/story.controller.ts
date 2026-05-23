import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { CreateStoryUseCase } from "../../application/createStory.usecase";
import { Response } from "express";

export class StoryController {
  constructor(private createStoryUsecase: CreateStoryUseCase) {}

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
}
