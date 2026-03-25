import { AppError } from "../../../../shared/utils";
import { MessageRepository } from "../../domain/repository/message/message.repository";
import { GetMessageDto } from "../../presentation/dtos/sendMessage.dto";

export class GetMessageUseCase {
  constructor(private readonly messageRepo: MessageRepository) {}
  // pagination by conversationId with page, limit
  async execute(data: GetMessageDto) {
    const { conversationId, page, limit } = data;
    const skip = (page - 1) * limit;

    const [result, totalMessages] = await Promise.all([
      this.messageRepo.getMessagesPagination(conversationId, limit, skip),
      this.messageRepo.getConversationMessagesCount(conversationId),
    ]);
    const totalPages = Math.ceil(totalMessages / limit);
    if (page > totalPages) {
      throw new AppError("Page number exceeds total pages", 400, "BAD_REQUEST");
    }
    return {
      data: result,
      pagination: {
        currentPage: page,
        totalPages,
        totalMessages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
