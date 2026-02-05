import { MessageRepository } from "../../../domain/repository/message/message.repository";
import { MessageType } from "../../../domain/entities/message/message.entity";
import prisma from "../../../../../lib/prisma";

export class MessageRepositoryPrisma implements MessageRepository {
  async create(data: {
    conversationId: string;
    senderId: string;
    content?: string;
    type: MessageType.TEXT;
  }) {
    return prisma.message.create({
      data: {
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content ?? null,
        type: data.type,
      },
    });
  }

  async findByConversationId(
    conversationId: string,
    limit = 20,
    cursor?: string,
  ) {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });
  }

  async findById(messageId: string) {
    return prisma.message.findUnique({
      where: { id: messageId },
    });
  }
}
