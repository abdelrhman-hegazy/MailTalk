import { ConversationRepository } from "../../domain/repository/conversation/conversation.repository";

export class GetConversationsUsecase {
  constructor(private conversationRepo: ConversationRepository) {}

  async execute(userId: string, limit: number, cursor: string) {
    // TODO: Implement get conversations logic
    const conversations = await this.conversationRepo.findConversationsByUserId(
      userId,
      limit,
      cursor,
    );
    console.log("conversations: ", conversations);

    return conversations;
  }
}
