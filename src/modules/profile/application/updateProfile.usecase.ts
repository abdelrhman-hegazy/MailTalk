import { AppError } from "../../../shared/utils";
import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { ProfileRepository } from "../domain/repository/profile.repository";
import { UpdateProfileDto } from "../presentation/dtos/profile.dto";

export class UpdateProfileUseCase {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly uploadFileService: CloudinaryService,
  ) {}
  async execute(data: UpdateProfileDto) {
    const profile = await this.profileRepo.findProfileByUserId(data.id);
    if (!profile) {
      throw new AppError("Not Found user profile", 404, "not_found");
    }
    if (!data.avatarUrl) {
      data.avatarUrl = null;
    } else {
      const existImage = await this.uploadFileService.exist(data.avatarUrl);
      if (!existImage) {
        throw new AppError("Image not found", 404, "not_found");
      }
    }
    if (profile.avatarUrl) {
      await this.uploadFileService.delete(profile.avatarUrl);
    }

    return this.profileRepo.updateProfile(data);
  }
}
