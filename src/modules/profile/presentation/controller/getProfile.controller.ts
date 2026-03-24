import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { GetProfileUseCase } from "../../application/getProfile.usecase";

export class PrfileController {
  constructor(private getProfileUsecase: GetProfileUseCase) {}

  getProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query;
    const result = await this.getProfileUsecase.execute(id as string);
    sendResponse(res, {
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: result,
    });
  });
}
