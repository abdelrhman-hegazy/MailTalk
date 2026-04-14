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

  async getMessagesPagination(
    conversationId: string,
    limit = 20,
    cursor: string,
  ) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });
    const nextCursor =
      messages.length === limit ? messages[messages.length - 1].id : null;
    return {
      data: messages,
      nextCursor,
    };
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

  async markAsDelivered(messageId: string) {
    return prisma.message.update({
      where: { id: messageId },
      data: { status: "DELIVERED" },
    });
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    return prisma.message.updateMany({
      where: { conversationId, senderId: { not: userId } },
      data: { status: "READ" },
    });
  }
}
