import { AvatarCloudinaryService } from "../../domain/services/avaterCloudinary.service";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../../../../shared/middlewares/uploadCloudinary.middleware";

export class CloudinaryService implements AvatarCloudinaryService {
  async upload(file: Express.Multer.File): Promise<string> {
    const uplodedImage = await uploadToCloudinary(file);
    return uplodedImage.url;
  }
  async delete(imageUrl: string): Promise<void> {
    await deleteFromCloudinary(imageUrl);
  }
}
