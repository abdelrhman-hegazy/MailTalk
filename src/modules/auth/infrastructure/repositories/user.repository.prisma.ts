// user.repository.prisma.ts
import prisma from "../../../../lib/prisma";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  password: true,
  provider: true,
  providerId: true,
  isVerified: true,
  createdAt: true,
  verificationCode: true,
  verificationCodeExpiry: true,
  refreshToken: true,
} as const;

export class UserRepositoryPrisma implements UserRepository {
  async deleteAllUsers(): Promise<void> {
    await prisma.user.deleteMany();
  }

  async createUser(user: User): Promise<User> {
    return prisma.user.create({
      data: user,
      select: USER_SELECT,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
      select: USER_SELECT,
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
  }

  async findByProvider(
    provider: string,
    providerId: string,
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: { provider, providerId },
      select: USER_SELECT,
    });
  }

  async findUserByEmailAndProvider(
    email: string,
    provider: string,
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: { email, provider },
      select: USER_SELECT,
    });
  }

  async updateUser(user: User): Promise<void> {
    await prisma.user.update({
      where: { id: user.id },
      data: user,
      select: USER_SELECT,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ select: USER_SELECT });
  }
}
