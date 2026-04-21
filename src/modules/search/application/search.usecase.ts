import { SearchRepositoryPrisma } from "../infrastructure/repository/search.repository.prisma";
export interface limitsDto {
  users: number;
  conversations: number;
  messages: number;
}
export interface cursorsDto {
  users: string;
  conversations: string;
  messages: string;
}
export class SearchUseCase {
  constructor(private readonly repo: SearchRepositoryPrisma) {}

  async execute(query: string, limit: number, cursors: cursorsDto) {
    const [users, conversations, messages] = await Promise.all([
      this.repo.searchUsers(query, limit, cursors.users),
      this.repo.searchConversations(query, limit, cursors.conversations),
      this.repo.searchMessages(query, limit, cursors.messages),
    ]);

    return {
      users,
      conversations,
      messages,
    };
  }
}
