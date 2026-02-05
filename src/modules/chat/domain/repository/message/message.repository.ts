import { Message, MessageType } from "../../entities/message/message.entity";

export interface MessageRepository {
  create(data: {
    conversationId: string;
    senderId: string;
    content?: string;
    type: MessageType;
  }): Promise<Message>;

  findByConversationId(
    conversationId: string,
    limit?: number,
    cursor?: string,
  ): Promise<Message[]>;

  findById(messageId: string): Promise<Message | null>;
}
