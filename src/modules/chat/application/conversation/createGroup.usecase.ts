import { ConversationRepository } from "../../domain/repository/conversation/conversation.repository";
import { ConversationMemberRepository } from "../../domain/repository/conversation/conversationMember.repository";
import { CreateGroupDto } from "../../presentation/dtos/conversation.dto";
import { ConversationType } from "../../domain/entities/conversation/conversation.entity";
import { UserRepository } from "../../../auth/domain/repositories/user.repository";
import { AppError } from "../../../../shared/utils";

export class CreateGroupUsecase {
  constructor(
    private conversationRepo: ConversationRepository,
    private conversationMemberRepo: ConversationMemberRepository,
    private userRepo: UserRepository,
  ) {}
  async execute(data: CreateGroupDto) {
    const members = data.members;
    for (const member of members) {
      const user = await this.userRepo.findById(member.userId);
      if (!user) {
        throw new AppError(
          `This User Not Found ID: ${member.userId}`,
          404,
          "not_found",
        );
      }
    }
    // create conversation
    const conversation = await this.conversationRepo.create({
      type: ConversationType.GROUP,
      name: data.name,
      imageUrl: data.imageUrl,
    });
    // create conversation members
    await this.conversationMemberRepo.createMany({
      conversationId: conversation.id,
      members: data.members.map((member) => ({
        userId: member.userId,
        role: member.role,
      })),
    });
    const getGroup = await this.conversationRepo.getGroup(conversation.id);
    return getGroup;
  }
}
