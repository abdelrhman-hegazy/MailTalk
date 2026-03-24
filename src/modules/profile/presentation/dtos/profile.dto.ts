export interface UpdateProfileDto {
  id: string;
  bio?: string;
  name?: string;
}

export interface ProfileData {
  id: string;
  userId: string;
  name: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
