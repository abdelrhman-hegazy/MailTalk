import { ConversationRepository } from "../../domain/repository/conversation/conversation.repository";

export class DeleteConversationUsecase {
  constructor(private readonly conversationRepo: ConversationRepository) {}

  async execute(conversationId: string): Promise<void> {
    await this.conversationRepo.deleteConversation(conversationId);
  }
}
