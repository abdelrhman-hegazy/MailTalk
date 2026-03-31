import { CloudinaryService } from "../../infrastructure/storage/cloudinary.storage";

export class UploadFileUsecase {
  constructor(private uploadImage: CloudinaryService) {}
  async execute(file: Express.Multer.File) {
    return this.uploadImage.upload(file);
  }
}
