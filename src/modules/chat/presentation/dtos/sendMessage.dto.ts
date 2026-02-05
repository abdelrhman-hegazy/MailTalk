import { MessageType } from "../../domain/entities/message/message.entity";

export interface SendMessageDTO {
  senderId: string;
  receiver?: string;
  conversationId?: string;
  content: string;
  type: MessageType;
}
