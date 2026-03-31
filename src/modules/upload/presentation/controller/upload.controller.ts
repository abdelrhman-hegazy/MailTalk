import { Request, Response } from "express";
import { AppError, catchAsync, sendResponse } from "../../../../shared/utils";
import { UploadFileUsecase } from "../../application/usecase/upload-file.usecase";

export class UploadController {
  constructor(private uploadFileUsecase: UploadFileUsecase) {}

  uploadFile = catchAsync(async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      throw new AppError("No file provided", 400, "bad_request");
    }
    const result = await this.uploadFileUsecase.execute(file);
    sendResponse(res, {
      statusCode: 200,
      message: "File uploaded successfully",
      data: result,
    });
  });
}
