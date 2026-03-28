import { MessageRepository } from "../../domain/repository/message/message.repository";
import { GetMessageDto } from "../../presentation/dtos/message.dto";

export class GetMessageUseCase {
  constructor(private readonly messageRepo: MessageRepository) {}
  // pagination by conversationId with page, limit
  async execute(data: GetMessageDto) {
    const { conversationId, cursor, limit } = data;

    const result = this.messageRepo.getMessagesPagination(
      conversationId,
      limit,
      cursor,
    );
    return result;
  }
}
