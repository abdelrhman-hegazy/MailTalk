export interface UpdateProfileDto {
  id: string;
  bio?: string;
  name?: string;
  avatarUrl?: string | null;
}

export interface ProfileData {
  id: string;
  userId: string;
  name: string;
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
