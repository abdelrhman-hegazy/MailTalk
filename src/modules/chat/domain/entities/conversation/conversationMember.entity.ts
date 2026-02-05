import { ConversationMemberRole } from "../../repository/conversation/conversationMember.repository";

export class ConversationMember {
  constructor(
    public readonly id: string,
    public readonly conversationId: string,
    public readonly userId: string,
    public readonly joinedAt: Date,
    public readonly role?: ConversationMemberRole,
  ) {}
}
