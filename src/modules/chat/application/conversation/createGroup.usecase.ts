import { ConversationRepository } from "../../domain/repository/conversation/conversation.repository";
import { ConversationMemberRepository } from "../../domain/repository/conversation/conversationMember.repository";
import { CreateGroupDto } from "../../presentation/dtos/conversation.dto";
import { ConversationType } from "../../domain/entities/conversation/conversation.entity";
import { CloudinaryService } from "../../../profile/infrastructure/services/cloudinary.service";
import { UserRepository } from "../../../auth/domain/repositories/user.repository";
import { AppError } from "../../../../shared/utils";

export class CreateGroupUsecase {
  constructor(
    private conversationRepo: ConversationRepository,
    private conversationMemberRepo: ConversationMemberRepository,
    private userRepo: UserRepository,
    private uploadImage: CloudinaryService,
  ) {}
  async execute(data: CreateGroupDto, file: Express.Multer.File) {
    // TODO: Implement group creation logic
    const imageUrl = file ? await this.uploadImage.upload(file) : "";
    // check members
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
      imageUrl,
    });
    // create conversation members
    await this.conversationMemberRepo.createMany({
      conversationId: conversation.id,
      members: data.members.map((member) => ({
        userId: member.userId,
        role: member.role,
      })),
    });

    return conversation;
  }
}
