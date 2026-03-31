import { AppError } from "../../../shared/utils";
import { ProfileRepositoryPrisma } from "../infrastructure/repository/profile.repository.prisma";

export class UpdateAvaterUseCase {
  constructor(private readonly profileRepo: ProfileRepositoryPrisma) {}
  async execute(imageUrl: string, userId: string) {
    const profile = await this.profileRepo.findProfileByUserId(userId);
    if (!profile) {
      throw new AppError("Not Found user profile", 404, "not_found");
    }
    if (imageUrl) {
      return await this.profileRepo.updateAvater({
        avatarUrl: imageUrl,
        userId,
      });
    } else {
      return await this.profileRepo.updateAvater({
        avatarUrl: "",
        userId,
      });
    }
  }
}
