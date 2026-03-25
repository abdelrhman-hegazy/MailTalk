import { ConversationRepositoryPrisma } from "../infrastructure/repository/conversation/conversation.repository.prisma";
import { MessageRepositoryPrisma } from "../infrastructure/repository/message/message.repository.prisma";
import { ConversationMemberRepositoryPrisma } from "../infrastructure/repository/conversation/conversationMember.repository.prisma";

import { SendMessageUseCase } from "../application/message/sendMessage.usecase";

import { MessageController } from "../presentation/controller/message.controller";
import { ChatSocketService } from "../infrastructure/services/socket/chat.socket.service";
import { GetMessageUseCase } from "../application/message/getMessage.usecase";
export function messageModule() {
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
  const getMessages = new GetMessageUseCase(messageRepo);

  return new MessageController(getMessages, sendMessage, chatSocketService);
}
