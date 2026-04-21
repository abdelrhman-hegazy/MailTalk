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
export interface SearchRepository {
  searchMessages(
    query: string,
    limits: limitsDto,
    cursors: cursorsDto,
  ): Promise<SearchMessageDto[]>;
  searchUsers(
    query: string,
    limits: limitsDto,
    cursors: cursorsDto,
  ): Promise<searchUserDto[]>;
  searchConversations(
    query: string,
    limits: limitsDto,
    cursors: cursorsDto,
  ): Promise<searchConversationDto>;
}
