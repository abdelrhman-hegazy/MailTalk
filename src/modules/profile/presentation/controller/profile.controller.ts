import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { GetProfileUseCase } from "../../application/getProfile.usecase";
import { UpdateProfileUseCase } from "../../application/updateProfile.usecase";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";

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
  updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const { name, bio, imageUrl } = req.body;
    const result = await this.updateProfileUsecase.execute({
      id,
      name,
      bio,
      avatarUrl: imageUrl,
    });
    sendResponse(res, {
      statusCode: 200,
      message: "Profile updated successfully",
      data: result,
    });
  });
}
