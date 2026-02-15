import { ConversationRepositoryPrisma } from "../infrastructure/repository/conversation/conversation.repository.prisma";
import { MessageRepositoryPrisma } from "../infrastructure/repository/message/message.repository.prisma";
import { ConversationMemberRepositoryPrisma } from "../infrastructure/repository/conversation/conversationMember.repository.prisma";

import { SendMessageUseCase } from "../application/sendMessage.usecase";

import { SendMessageController } from "../presentation/controller/sendMessage.controller";
import { ChatSocketService } from "../infrastructure/services/socket/chat.socket.service";
export function ChatModule() {
  const conversationRepo = new ConversationRepositoryPrisma();
  const conversationMemberRepo = new ConversationMemberRepositoryPrisma();
  const messageRepo = new MessageRepositoryPrisma();
  const chatSocketService = new ChatSocketService();
  // send message use case
  const sendMessage = new SendMessageUseCase(
    conversationRepo,
    conversationMemberRepo,
    messageRepo,
  );

  return new SendMessageController(sendMessage, chatSocketService);
}
