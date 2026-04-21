export interface SearchMessageDto {
  id: string;
  content: string;
  userName: string;
  createdAt: Date;
}
export interface searchUserDto {
  id: string;
  name: string;
  profile: {
    bio: string;
    image: string;
  };
}
export interface searchConversationDto {
  id: string;
  name: string;
  members: {
    name: string;
  };
  messages: {
    content: string;
  }[];
}
export interface SearchRepository {
  searchMessages(query: string, limit: number): Promise<SearchMessageDto[]>;
  searchUsers(query: string, limit: number): Promise<searchUserDto[]>;
  searchConversations(
    query: string,
    limit: number,
  ): Promise<searchConversationDto>;
}
