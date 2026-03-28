import { MessageType } from "../../domain/entities/message/message.entity";

export interface SendMessageDTO {
  senderId: string;
  receiverId?: string;
  conversationId?: string;
  content: string;
  type: MessageType;
}

export class MessageSocketDto {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
}

export interface GetMessageDto {
  conversationId: string;
  cursor?: string;
  limit?: number;
}
