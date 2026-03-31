import {
  CreateConversationDto,
  GetGroupDto,
} from "../../../presentation/dtos/conversation.dto";
import { Conversation } from "../../entities/conversation/conversation.entity";

export interface ConversationRepository {
  create(data: CreateConversationDto): Promise<Conversation>;

  findById(conversationId: string): Promise<Conversation | null>;

  findOneToOneConversation(
    conversationId: string,
  ): Promise<Conversation | null>;

  findConversationsByUserId(
    userId: string,
    limit?: number,
    cursor?: string,
  ): Promise<{
    data: Conversation[];
    nextCursor: string | null;
  }>;
  getGroup(conversationId: string): Promise<GetGroupDto | null>;
}
