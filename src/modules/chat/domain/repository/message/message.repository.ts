import { Message, MessageType } from "../../entities/message/message.entity";

export interface MessageRepository {
  create(data: {
    conversationId: string;
    senderId: string;
    content?: string;
    type: MessageType;
    status: string;
  }): Promise<Message>;

  getMessagesPagination(
    conversationId: string,
    limit?: number,
    cursor?: string,
  ): Promise<{
    data: Message[];
    nextCursor: string | null;
  }>;
  getConversationMessagesCount(conversationId: string): Promise<number>;
  findById(messageId: string): Promise<Message | null>;
  markAsDelivered(messageId: string): Promise<void>;
  markAsRead(convrsationId: string): Promise<void>;
}
