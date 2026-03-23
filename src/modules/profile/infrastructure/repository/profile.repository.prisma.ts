import { ProfileRepository } from "../../domain/repository/profile.repository";
import { Profile } from "../../domain/entities/profile.entity";
import { ProfileData } from "../../domain/repository/profile.repository";
import prisma from "../../../../lib/prisma";

const PROFILE_SELECT = {
  id: true,
  userId: true,
  name: true,
  bio: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class ProfileRepositoryPrisma implements ProfileRepository {
  async findProfileByUserId(userId: string): Promise<ProfileData | null> {
    const data = await prisma.profile.findUnique({
      where: { userId },
      select: PROFILE_SELECT,
    });

    return data ?? null;
  }

  async createProfile(userId: string): Promise<ProfileData> {
    return prisma.profile.create({
      data: { userId },
      select: PROFILE_SELECT,
    });
  }

  async updateProfile(profile: Profile): Promise<ProfileData | null> {
    const { bio, avatarUrl } = profile;

    return prisma.profile.update({
      where: { id: profile.id },
      data: { bio, avatarUrl },
      select: PROFILE_SELECT,
    });
  }
}
