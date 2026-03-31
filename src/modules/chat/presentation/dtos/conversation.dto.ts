import { ConversationType } from "../../domain/entities/conversation/conversation.entity";

import { ConversationMemberRole } from "../../domain/entities/conversation/conversationMember.entity";

export interface CreateGroupDto {
  imageUrl?: string;
  name: string;
  members: {
    userId: string;
    role: ConversationMemberRole;
  }[];
}

export interface CreateConversationDto {
  type: ConversationType;
  name?: string;
  imageUrl?: string;
}

export interface GetGroupDto {
  id: string;
  name: string;
  image: string;
  type: ConversationType;
  createdAt: Date;
  members: {
    userId: string;
    role: ConversationMemberRole;
  }[];
}
