import {
  ProfileData,
  UpdateProfileDto,
} from "../../presentation/dtos/profile.dto";

export interface ProfileRepository {
  findProfileByUserId(userId: string): Promise<ProfileData | null>;
  createProfile(userId: string): Promise<ProfileData>;
  updateProfile(profile: UpdateProfileDto): Promise<ProfileData>;
}
