import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { Response } from "express";
import { AddViewUsecase } from "../../application/viewStory/addView.usecase";
import { GetViewersUsecase } from "../../application/viewStory/getViewers.usecase";

export class ViewStoryController {
  constructor(
    private getViewersUsecase: GetViewersUsecase,
    private addViewUsecase: AddViewUsecase,
  ) {}

  addView = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const storyId = req.params.id as string;
    const message = await this.addViewUsecase.execute(storyId, id);
    sendResponse(res, {
      statusCode: 200,
      message,
    });
  });

  getViewers = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const storyId = req.params.id as string;
    const result = await this.getViewersUsecase.execute(storyId, id);
    sendResponse(res, {
      statusCode: 200,
      message: "Viewers fetched successfully",
      data: result,
    });
  });
}
