import { UserRepositoryPrisma } from "../../auth/infrastructure/repositories/user.repository.prisma";
import { CloudinaryService } from "../../profile/infrastructure/services/cloudinary.service";
import { CreateGroupUsecase } from "../application/conversation/createGroup.usecase";
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
  return new ConversationController(createGroupUsecase);
}
