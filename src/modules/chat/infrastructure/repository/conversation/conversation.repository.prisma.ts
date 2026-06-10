// import { RoleType } from "../../../../../../prisma/src/generated/prisma";
import prisma from "../../../../../lib/prisma";
import { AppError } from "../../../../../shared/utils";
import { ConversationType } from "../../../domain/entities/conversation/conversation.entity";
import { ConversationRepository } from "../../../domain/repository/conversation/conversation.repository";
import { CreateConversationDto } from "../../../presentation/dtos/conversation.dto";

export class ConversationRepositoryPrisma implements ConversationRepository {
  async create(data: CreateConversationDto) {
    return prisma.conversation.create({
      data,
    });
  }

  async findById(conversationId: string) {
    return prisma.conversation.findUnique({
      where: { id: conversationId },
    });
  }

  async findOneToOneConversation(conversationId: string) {
    return prisma.conversation.findFirst({
      where: {
        id: conversationId,
        type: ConversationType.ONE_TO_ONE,
      },
    });
  }
  async findConversationsByUserId(
    userId: string,
    limit: number = 2,
    cursor?: string,
  ) {
    const conversations = await prisma.conversation.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        type: true,
        members: {
          select: {
            userId: true,
            user: {
              select: {
                name: true,
                profile: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: {
            senderId: true,
            content: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    const nextCursor =
      conversations.length === limit
        ? conversations[conversations.length - 1].id
        : null;

    const data = conversations.map((conv) => {
      const lastMessage = conv.messages[0] || null;

      if (conv.type === "GROUP") {
        return {
          id: conv.id,
          name: conv.name,
          image: conv.imageUrl,
          type: conv.type,
          lastMessage,
        };
      }

      const otherMember = conv.members.find((m) => m.userId !== userId);

      return {
        id: conv.id,
        name: otherMember?.user.name,
        image: otherMember?.user.profile?.avatarUrl,
        type: conv.type,
        lastMessage,
      };
    });

    return {
      data,
      nextCursor,
    };
  }

  async getGroup(conversationId: string) {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        type: true,
        createdAt: true,
        members: {
          select: {
            userId: true,
            role: true,
            user: {
              select: {
                name: true,
                profile: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      throw new AppError("Conversation not found", 404, "not_found");
    }

    const { id, name, imageUrl, type, createdAt, members } = conversation;

    return {
      id,
      name,
      image: imageUrl,
      type,
      createdAt,
      members,
    };
  }
  async deleteConversation(conversationId: string): Promise<void> {
    await prisma.$transaction([
      prisma.message.deleteMany({ where: { conversationId } }),
      prisma.conversationMember.deleteMany({ where: { conversationId } }),
      prisma.conversation.delete({ where: { id: conversationId } }),
    ]);
  }
}
