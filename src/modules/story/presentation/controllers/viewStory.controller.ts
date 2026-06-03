import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { Request, Response } from "express";
import { GetStoryOthersUsecase } from "../../application/view/getStoryOthers.usecase";


export class ViewStoryController {
  constructor(
    private getStoryOthers: GetStoryOthersUsecase
  ) {}

  viewStoryOthers = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const result = await this.getStoryOthers.execute(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Story others fetched successfully",
      data: result,
    });
  });
}
