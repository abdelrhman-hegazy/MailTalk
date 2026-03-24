import { AppError } from "../../../shared/utils";
import { ProfileRepositoryPrisma } from "../infrastructure/repository/profile.repository.prisma";
import { CloudinaryService } from "../infrastructure/services/cloudinary.service";

export class UpdateAvaterUseCase {
  constructor(
    private readonly profileRepo: ProfileRepositoryPrisma,
    private readonly updateAvaterService: CloudinaryService,
  ) {}
  async execute(file: Express.Multer.File, userId: string) {
    const profile = await this.profileRepo.findProfileByUserId(userId);
    if (!profile) {
      throw new AppError("Not Found user profile", 404, "not_found");
    }
    if (file) {
      const result = await this.updateAvaterService.upload(file);
      return await this.profileRepo.updateAvater({
        avatarUrl: result,
        userId,
      });
    } else {
      console.log("before delete /////", profile);

      if (profile.avatarUrl) {
        console.log("deleting avatar", profile.avatarUrl);
        await this.updateAvaterService.delete(profile.avatarUrl);
      }
      return await this.profileRepo.updateAvater({
        avatarUrl: "",
        userId,
      });
    }
  }
}
