import { ProfileRepository } from "../domain/repository/profile.repository";

export class GetProfileUseCase {
  constructor(private readonly profileRepo: ProfileRepository) {}
  async execute(userId: string) {
    let profile = await this.profileRepo.findProfileByUserId(userId);
    if (!profile) {
      profile = await this.profileRepo.createProfile(userId);
    }
    return profile;
  }
}
