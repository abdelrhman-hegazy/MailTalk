import { SendMessageUseCase } from "../../application/sendMessage.usecase";
import { catchAsync } from "../../../../shared/utils";
import { Request, Response } from "express";
import { sendResponse } from "../../../../shared/utils";
import { SendMessageDTO } from "../dtos/sendMessage.dto";
import { ChatSocketService } from "../../infrastructure/services/socket/chat.socket.service";
export class SendMessageController {
  constructor(
    private sendMessageUseCase: SendMessageUseCase,
    private chatSocketService: ChatSocketService,
  ) {}
  sendMessage = catchAsync(async (req: Request, res: Response) => {
    const { senderId, receiverId, conversationId, content }: SendMessageDTO =
      req.body;
    const result = await this.sendMessageUseCase.execute({
      senderId,
      receiverId,
      conversationId,
      content,
    });
    this.chatSocketService.emitNewMessage(conversationId, result.content);
    sendResponse(res, {
      statusCode: 200,
      message: "Message sent successfully",
      data: result,
    });
  });
}
