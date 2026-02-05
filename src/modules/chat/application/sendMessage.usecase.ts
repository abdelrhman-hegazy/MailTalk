import { AppError } from "../../../shared/utils";
import { UserRepository } from "../../auth/domain/repositories/user.repository";
import { ConversationType } from "../domain/entities/conversation/conversation.entity";
import { MessageType } from "../domain/entities/message/message.entity";
import { ConversationRepository } from "../domain/repository/conversation/conversation.repository";
import { ConversationMemberRepository } from "../domain/repository/conversation/conversationMember.repository";
import { MessageRepository } from "../domain/repository/message/message.repository";

interface SendMessageInput {
  senderId: string;
  receiver?: string;
  conversationId?: string;
  content: string;
}

export class SendMessageUseCase {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly conversationMemberRepo: ConversationMemberRepository,
    private readonly messageRepo: MessageRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(input: SendMessageInput) {
    const { senderId, receiver, conversationId, content } = input;
    // get receiver id
    let receiverId: string;
    if (receiver) {
      const existingReceiver = await this.userRepo.findUserByEmail(receiver);
      if (!existingReceiver) {
        throw new AppError("User not found", 404, "NOT_FOUND");
      }
      receiverId = existingReceiver.id;
    }
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
    });

    return message;
  }
  // 🟢 CASE 2: create message
  private async createConversation(
    senderId: string,
    receiverId: string,
    finalConversationId: string,
  ) {
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
    return finalConversationId;
  }
}
