import { SendMessageUseCase } from "../../application/sendMessage.usecase";
import { catchAsync } from "../../../../shared/utils";
import { Request, Response } from "express";
import { sendResponse } from "../../../../shared/utils";
import { SendMessageDTO } from "../dtos/sendMessage.dto";
import { ChatSocketService } from "../../infrastructure/services/socket/chat.socket.service";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
export class SendMessageController {
  constructor(
    private sendMessageUseCase: SendMessageUseCase,
    private chatSocketService: ChatSocketService,
  ) {}
  sendMessage = catchAsync(async (req: Request, res: Response) => {
    const { receiverId, conversationId, content }: SendMessageDTO = req.body;

    const senderId = (req as AuthRequest).user.id;
    const result = await this.sendMessageUseCase.execute({
      senderId,
      receiverId,
      conversationId,
      content,
    });
    // send notification to user or group
    this.chatSocketService.emitNewMessage(conversationId, receiverId, result);
    sendResponse(res, {
      statusCode: 200,
      message: "Message sent successfully",
      data: result,
    });
  });
}
