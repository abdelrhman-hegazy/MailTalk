import prisma from "../../../../../lib/prisma";
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
}
