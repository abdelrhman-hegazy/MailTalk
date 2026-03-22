import { Profile } from "../entities/profile.entity";

export interface ProfileRepository {
  findProfileById(id: string): Promise<Profile | null>;
  findProfileByUserId(userId: string): Promise<Profile | null>;
  updateProfile(profile: Profile): Promise<void>;
}
