import { SearchRepository } from "../infrastructure/repository/search.repository.prisma";

export class SearchUseCase {
  constructor(private readonly repo: SearchRepository) {}

  async execute(query: string) {
    const [users, conversations, messages] = await Promise.all([
      this.repo.searchUsers(query),
      this.repo.searchConversations(query),
      this.repo.searchMessages(query),
    ]);

    return {
      users,
      conversations,
      messages,
    };
  }
}
