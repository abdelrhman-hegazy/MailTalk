import { ConversationRepository } from "../../domain/repository/conversation/conversation.repository";
import { ConversationMemberRepository } from "../../domain/repository/conversation/conversationMember.repository";

export class CreateGroupUsecase {
  constructor(
    private conversationRepo: ConversationRepository,
    private conversationMemberRepo: ConversationMemberRepository,
  ) {}
}
