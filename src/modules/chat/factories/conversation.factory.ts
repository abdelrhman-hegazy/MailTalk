import { UserRepositoryPrisma } from "../../auth/infrastructure/repositories/user.repository.prisma";
import { CreateGroupUsecase } from "../application/conversation/createGroup.usecase";
import { DeleteConversationUsecase } from "../application/conversation/deleteConversation";
import { GetConversationsUsecase } from "../application/conversation/getConversations.usecase";
import { ConversationRepositoryPrisma } from "../infrastructure/repository/conversation/conversation.repository.prisma";
import { ConversationMemberRepositoryPrisma } from "../infrastructure/repository/conversation/conversationMember.repository.prisma";
import { ConversationController } from "../presentation/controller/conversation.controller";

export function conversationModule() {
  const conversationRepo = new ConversationRepositoryPrisma();
  const conversationMemberRepo = new ConversationMemberRepositoryPrisma();
  const userRepo = new UserRepositoryPrisma();

  const createGroupUsecase = new CreateGroupUsecase(
    conversationRepo,
    conversationMemberRepo,
    userRepo,
  );
  const getConversationsUsecase = new GetConversationsUsecase(conversationRepo);
  const deleteConversationUsecase = new DeleteConversationUsecase(
    conversationRepo,
  );

  return new ConversationController(
    createGroupUsecase,
    getConversationsUsecase,
    deleteConversationUsecase,
  );
}
