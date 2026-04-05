import { UserRepositoryPrisma } from "../../auth/infrastructure/repositories/user.repository.prisma";
import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { CreateGroupUsecase } from "../application/conversation/createGroup.usecase";
import { GetConversationsUsecase } from "../application/conversation/getConversations.usecase";
import { ConversationRepositoryPrisma } from "../infrastructure/repository/conversation/conversation.repository.prisma";
import { ConversationMemberRepositoryPrisma } from "../infrastructure/repository/conversation/conversationMember.repository.prisma";
import { ConversationController } from "../presentation/controller/conversation.controller";

export function conversationModule() {
  const conversationRepo = new ConversationRepositoryPrisma();
  const conversationMemberRepo = new ConversationMemberRepositoryPrisma();
  const userRepo = new UserRepositoryPrisma();
  const uploadImage = new CloudinaryService();

  const createGroupUsecase = new CreateGroupUsecase(
    conversationRepo,
    conversationMemberRepo,
    userRepo,
    uploadImage,
  );
  const getConversationsUsecase = new GetConversationsUsecase(conversationRepo);

  return new ConversationController(
    createGroupUsecase,
    getConversationsUsecase,
  );
}
