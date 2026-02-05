import prisma from "../../../../../lib/prisma";
import { ConversationType } from "../../../domain/entities/conversation/conversation.entity";
import {
  ConversationMemberRepository,
  ConversationMemberRole,
} from "../../../domain/repository/conversation/conversationMember.repository";

export class ConversationMemberRepositoryPrisma implements ConversationMemberRepository {
  async createMany(data: {
    conversationId: string;
    members: {
      userId: string;
      role?: ConversationMemberRole;
    }[];
  }) {
    await prisma.conversationMember.createMany({
      data: data.members.map((member) => ({
        conversationId: data.conversationId,
        userId: member.userId,
        role: member.role ?? ConversationMemberRole.MEMBER,
      })),
    });
  }

  async findConversationIdsByUserId(userId: string) {
    const rows = await prisma.conversationMember.findMany({
      where: { userId },
      select: { conversationId: true },
    });

    return rows.map((r) => r.conversationId);
  }

  async findOneToOneConversationBetweenUsers(userA: string, userB: string) {
    const conversation = await prisma.conversation.findFirst({
      where: {
        type: ConversationType.ONE_TO_ONE,
        members: {
          every: {
            userId: {
              in: [userA, userB],
            },
          },
        },
      },
      select: { id: true },
    });

    return conversation?.id ?? null;
  }

  async isUserMemberOfConversation(conversationId: string, userId: string) {
    const count = await prisma.conversationMember.count({
      where: {
        conversationId,
        userId,
      },
    });

    return count > 0;
  }
}
