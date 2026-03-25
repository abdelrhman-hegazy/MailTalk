export interface UpdateProfileDto {
  id: string;
  bio?: string;
  name?: string;
}

export interface UpdateAvaterDto {
  avatarUrl: string;
  userId: string;
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
