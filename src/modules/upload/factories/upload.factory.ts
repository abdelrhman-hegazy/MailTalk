import { UploadFileUsecase } from "../application/usecase/upload-file.usecase";
import { CloudinaryService } from "../infrastructure/storage/cloudinary.storage";
import { UploadController } from "../presentation/controller/upload.controller";

export function uploadModule() {
  const cloudinaryService = new CloudinaryService();
  const uploadFileUsecase = new UploadFileUsecase(cloudinaryService);
  const uploadController = new UploadController(uploadFileUsecase);
  return uploadController;
}
