export enum ConversationMemberRole {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}
export interface ConversationMemberRepository {
  createMany(data: {
    conversationId: string;
    members: {
      userId: string;
      role?: ConversationMemberRole;
    }[];
  }): Promise<void>;

  findConversationIdsByUserId(userId: string): Promise<string[]>;

  findOneToOneConversationBetweenUsers(
    userA: string,
    userB: string,
  ): Promise<string | null>;

  isUserMemberOfConversation(
    conversationId: string,
    userId: string,
  ): Promise<boolean>;
}
