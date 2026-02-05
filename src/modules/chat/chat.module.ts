import { ConversationRepositoryPrisma } from "./infrastructure/repository/conversation/conversation.repository.prisma";
import { MessageRepositoryPrisma } from "./infrastructure/repository/message/message.repository.prisma";
import { UserRepositoryPrisma } from "../auth/infrastructure/repositories/user.repository.prisma";
import { ConversationMemberRepositoryPrisma } from "./infrastructure/repository/conversation/conversationMember.repository.prisma";

import { SendMessageUseCase } from "./application/sendMessage.usecase";

import { ChatController } from "./presentation/controller/chat.control";
export function ChatModule() {
  const conversationRepo = new ConversationRepositoryPrisma();
  const conversationMemberRepo = new ConversationMemberRepositoryPrisma();
  const messageRepo = new MessageRepositoryPrisma();
  const userRepo = new UserRepositoryPrisma();
  // send message use case
  const sendMessage = new SendMessageUseCase(
    conversationRepo,
    conversationMemberRepo,
    messageRepo,
    userRepo,
  );

  return new ChatController(sendMessage);
}
