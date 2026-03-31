import { UploadFileService } from "../../domain/services/upload-file.service";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../presentation/middleware/uploadCloudinary.middleware";

export class CloudinaryService implements UploadFileService {
  async upload(file: Express.Multer.File): Promise<string> {
    const uplodedImage = await uploadToCloudinary(file);
    return uplodedImage.url;
  }
  async delete(imageUrl: string): Promise<void> {
    await deleteFromCloudinary(imageUrl);
  }
}
