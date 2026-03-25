import { MessageRepository } from "../../../domain/repository/message/message.repository";
import { MessageType } from "../../../domain/entities/message/message.entity";
import prisma from "../../../../../lib/prisma";

export class MessageRepositoryPrisma implements MessageRepository {
  async create(data: {
    conversationId: string;
    senderId: string;
    content?: string;
    type: MessageType.TEXT;
    status: string;
  }) {
    return prisma.message.create({
      data: {
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content ?? null,
        type: data.type,
        status: data.status,
      },
    });
  }

  async getMessagesPagination(conversationId: string, limit = 20, skip = 0) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });
  }

  async findById(messageId: string) {
    return prisma.message.findUnique({
      where: { id: messageId },
    });
  }
  async getConversationMessagesCount(conversationId: string) {
    return prisma.message.count({
      where: { conversationId },
    });
  }
}
