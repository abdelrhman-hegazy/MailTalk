import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { GetProfileUseCase } from "../../application/getProfile.usecase";
import { UpdateProfileUseCase } from "../../application/updateProfile.usecase";

export class ProfileController {
  constructor(
    private getProfileUsecase: GetProfileUseCase,
    private updateProfileUsecase: UpdateProfileUseCase,
  ) {}

  getProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query;
    const result = await this.getProfileUsecase.execute(id as string);
    sendResponse(res, {
      statusCode: 200,
      message: "Profile retrieved successfully",
      data: result,
    });
  });
  updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query;
    const result = await this.updateProfileUsecase.execute({
      id: id as string,
      ...req.body,
    });
    sendResponse(res, {
      statusCode: 200,
      message: "Profile updated successfully",
      data: result,
    });
  });
}
