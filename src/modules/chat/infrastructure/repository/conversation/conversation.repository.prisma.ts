import prisma from "../../../../../lib/prisma";
import { ConversationType } from "../../../domain/entities/conversation/conversation.entity";
import { ConversationRepository } from "../../../domain/repository/conversation/conversation.repository";

export class ConversationRepositoryPrisma implements ConversationRepository {
  async create(data: { type: ConversationType; title?: string | null }) {
    return prisma.conversation.create({
      data: {
        type: data.type,
        title: data.title ?? null,
      },
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
}
