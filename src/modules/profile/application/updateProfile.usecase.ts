import { AppError } from "../../../shared/utils";
import { ProfileRepository } from "../domain/repository/profile.repository";
import { UpdateProfileDto } from "../presentation/dtos/profile.dto";

export class UpdateProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}
  async execute(data: UpdateProfileDto) {
    // TODO: Implement update profile logic
    const getProfile = await this.profileRepo.findProfileByUserId(data.id);
    if (!getProfile)
      throw new AppError("Not Found user profile", 500, "not_found");
    return this.profileRepo.updateProfile(data);
  }
}
