import {
  Conversation,
  ConversationType,
} from "../../entities/conversation/conversation.entity";

export interface ConversationRepository {
  create(data: {
    type: ConversationType;
    title?: string | null;
  }): Promise<Conversation>;

  findById(conversationId: string): Promise<Conversation | null>;

  findOneToOneConversation(
    conversationId: string,
  ): Promise<Conversation | null>;
}
