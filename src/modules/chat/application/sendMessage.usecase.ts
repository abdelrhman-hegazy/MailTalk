import { MessageStatus } from "../../../../prisma/src/generated/prisma";
import { AppError } from "../../../shared/utils";
import { ConversationType } from "../domain/entities/conversation/conversation.entity";
import { MessageType } from "../domain/entities/message/message.entity";
import { ConversationRepository } from "../domain/repository/conversation/conversation.repository";
import { ConversationMemberRepository } from "../domain/repository/conversation/conversationMember.repository";
import { MessageRepository } from "../domain/repository/message/message.repository";
import { SendMessageDTO } from "../presentation/dtos/sendMessage.dto";

export class SendMessageUseCase {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly conversationMemberRepo: ConversationMemberRepository,
    private readonly messageRepo: MessageRepository,
  ) {}

  async execute(input: SendMessageDTO) {
    const { senderId, receiverId, conversationId, content } = input;
    // get receiver id
    if (senderId === receiverId) {
      throw new AppError(
        "You cannot send message to yourself",
        400,
        "INVALID_INPUT",
      );
    }

    let finalConversationId = conversationId;
    let isMember = false;

    // 🟢 CASE 1: Existing conversation
    if (conversationId) {
      const conversation = await this.conversationRepo.findById(conversationId);
      if (!conversation) {
        throw new AppError("Conversation not found", 404, "NOT_FOUND");
      }
      isMember = await this.conversationMemberRepo.isUserMemberOfConversation(
        conversationId,
        senderId,
      );

      if (!isMember) {
        throw new AppError(
          "You are not a member of this conversation",
          403,
          "FORBIDDEN",
        );
      }
    }

    // 🟢 CASE 2: One-to-One (create or reuse)

    finalConversationId = await this.createConversation(
      senderId,
      receiverId,
      finalConversationId,
    );
    // 🟢 Create message
    const message = await this.messageRepo.create({
      conversationId: finalConversationId!,
      senderId,
      content,
      type: MessageType.TEXT,
      status: MessageStatus.SENT,
    });

    return message;
  }
  // 🟢 CASE 2: create message
  private async createConversation(
    senderId: string,
    receiverId: string | undefined,
    finalConversationId: string | undefined,
  ) {
    // send message to private conversation
    if (receiverId) {
      const existingConversationId =
        await this.conversationMemberRepo.findOneToOneConversationBetweenUsers(
          senderId,
          receiverId,
        );

      if (existingConversationId) {
        finalConversationId = existingConversationId;
      } else {
        const conversation = await this.conversationRepo.create({
          type: ConversationType.ONE_TO_ONE,
        });
        await this.conversationMemberRepo.createMany({
          conversationId: conversation.id,
          members: [{ userId: senderId }, { userId: receiverId }],
        });

        finalConversationId = conversation.id;
      }
    }
    // send message to group
    if (finalConversationId && !receiverId) {
      const conversation = await this.conversationRepo.create({
        type: ConversationType.GROUP,
      });
      await this.conversationMemberRepo.createMany({
        conversationId: conversation.id,
        members: [{ userId: senderId }],
      });

      finalConversationId = conversation.id;
    }
    return finalConversationId;
  }
}
