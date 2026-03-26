import { SendMessageUseCase } from "../../application/message/sendMessage.usecase";
import { catchAsync } from "../../../../shared/utils";
import { Request, Response } from "express";
import { sendResponse } from "../../../../shared/utils";
import { SendMessageDTO } from "../dtos/message.dto";
import { ChatSocketService } from "../../infrastructure/services/socket/chat.socket.service";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { GetMessageUseCase } from "../../application/message/getMessage.usecase";
export class MessageController {
  constructor(
    private getMessageUseCase: GetMessageUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private chatSocketService: ChatSocketService,
  ) {}
  sendMessage = catchAsync(async (req: Request, res: Response) => {
    const { receiverId, conversationId, content, type }: SendMessageDTO =
      req.body;

    const senderId = (req as AuthRequest).user.id;
    const result = await this.sendMessageUseCase.execute({
      senderId,
      receiverId,
      conversationId,
      content,
      type,
    });
    // send notification to user or group
    this.chatSocketService.emitNewMessage(conversationId, receiverId, result);
    sendResponse(res, {
      statusCode: 200,
      message: "Message sent successfully",
      data: result,
    });
  });

  getMessages = catchAsync(async (req: Request, res: Response) => {
    const { conversationId, page, limit } = req.query;

    if (!conversationId) {
      return sendResponse(res, {
        statusCode: 400,
        message: "conversationId is required",
      });
    }

    const result = await this.getMessageUseCase.execute({
      conversationId: conversationId as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });
    sendResponse(res, {
      statusCode: 200,
      message: "Messages retrieved successfully",
      data: result,
    });
  });
}
