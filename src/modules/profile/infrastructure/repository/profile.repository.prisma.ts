import { ProfileRepository } from "../../domain/repository/profile.repository";
import {
  ProfileData,
  UpdateAvaterDto,
} from "../../presentation/dtos/profile.dto";
import prisma from "../../../../lib/prisma";
import { UpdateProfileDto } from "../../presentation/dtos/profile.dto";

const PROFILE_SELECT = {
  id: true,
  userId: true,
  bio: true,
  avatarUrl: true,
  createdAt: true,
  user: {
    select: {
      name: true,
    },
  },
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

  async updateProfile(
    updateProfile: UpdateProfileDto,
  ): Promise<ProfileData | null> {
    return prisma.profile.update({
      where: { userId: updateProfile.id },
      data: {
        bio: updateProfile.bio,
        user: {
          update: {
            name: updateProfile.name,
          },
        },
      },
      select: PROFILE_SELECT,
    });
  }
  async updateAvater(
    updateAvaterDto: UpdateAvaterDto,
  ): Promise<ProfileData | null> {
    return prisma.profile.update({
      where: { userId: updateAvaterDto.userId },
      data: {
        avatarUrl: updateAvaterDto.avatarUrl,
      },
      select: PROFILE_SELECT,
    });
  }
}
