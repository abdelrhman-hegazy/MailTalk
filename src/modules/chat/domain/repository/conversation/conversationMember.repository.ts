import { Conversation } from "../../entities/conversation/conversation.entity";
import { ConversationMemberRole } from "../../entities/conversation/conversationMember.entity";

export interface ConversationMemberRepository {
  createMany(data: {
    conversationId: string;
    members: {
      userId: string;
      role?: ConversationMemberRole;
    }[];
  }): Promise<void>;

  findConversationIdsByUserId(userId: string): Promise<Conversation[]>;

  findOneToOneConversationBetweenUsers(
    userA: string,
    userB: string,
  ): Promise<string | null>;

  isUserMemberOfConversation(
    conversationId: string,
    userId: string,
  ): Promise<boolean>;

  findMembersByConversationId(
    conversationId: string,
    senderId: string,
  ): Promise<string[]>;
}
