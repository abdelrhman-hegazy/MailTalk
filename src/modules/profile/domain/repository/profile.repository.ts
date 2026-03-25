import { UpdateProfileDto } from "../../presentation/dtos/profile.dto";

export interface ProfileData {
  id: string;
  userId: string;
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    email: string;
    name: string;
  };
}
export interface ProfileRepository {
  findProfileByUserId(userId: string): Promise<ProfileData | null>;
  createProfile(userId: string): Promise<ProfileData>;
  updateProfile(profile: UpdateProfileDto): Promise<ProfileData>;
}
