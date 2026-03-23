import { Profile } from "../entities/profile.entity";

export interface ProfileData {
  id: string;
  userId: string;
  name: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProfileRepository {
  findProfileByUserId(userId: string): Promise<ProfileData | null>;
  createProfile(userId: string): Promise<ProfileData>;
  updateProfile(profile: Profile): Promise<ProfileData>;
}
