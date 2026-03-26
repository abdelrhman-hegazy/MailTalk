import { ConversationType } from "../../domain/entities/conversation/conversation.entity";

import { ConversationMemberRole } from "../../domain/entities/conversation/conversationMember.entity";

export interface CreateGroupDto {
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
