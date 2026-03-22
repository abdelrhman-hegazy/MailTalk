import { Profile } from "../entities/profile.entity";

export interface ProfileRepository {
  findProfileByUserId(userId: string): Promise<Profile | null>;
  createProfile(userId: string): Promise<Profile>;
  updateProfile(profile: Profile): Promise<void>;
}
