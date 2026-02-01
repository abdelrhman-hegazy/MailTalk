import prisma from "../../../../lib/prisma";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryPrisma implements UserRepository {
  async deleteAllUsers() {
    await prisma.user.deleteMany();
  }
  async createUser(user: User) {
    const data = await prisma.user.create({
      data: user,
    });
    return data ? this.returnData(data) : null;
  }
  async findUserByEmail(email: string) {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return data ? this.returnData(data) : null;
  }

  async findById(id: string) {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return data ? this.returnData(data) : null;
  }
  async updateUser(user: User) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    });
  }
  async getAllUsers(): Promise<User[]> {
    const data = await prisma.user.findMany();
    return data;
  }
  returnData(data: User): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.password,
      data.provider,
      data.providerId,
      data.isVerified,
      data.createdAt,
      data.verificationCode,
      data.verificationCodeExpiry,
      data.refreshToken,
    );
  }
}
