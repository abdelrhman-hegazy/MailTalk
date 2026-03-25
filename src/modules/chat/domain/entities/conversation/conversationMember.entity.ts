export enum ConversationMemberRole {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}
export class ConversationMember {
  constructor(
    public readonly id: string,
    public readonly conversationId: string,
    public readonly userId: string,
    public readonly joinedAt: Date,
    public readonly role?: ConversationMemberRole,
  ) {}
}
