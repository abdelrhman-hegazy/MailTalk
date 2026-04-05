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
    this.chatSocketService.emitNewMessage(
      result.message.conversationId,
      result.message,
    );
    this.chatSocketService.emitNotification(result.receiversId, result.message);
    sendResponse(res, {
      statusCode: 200,
      message: "Message sent successfully",
      data: result,
    });
  });

  getMessages = catchAsync(async (req: Request, res: Response) => {
    const { conversationId, cursor, limit } = req.query;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : 10;
    const cursorStr = typeof cursor === "string" ? cursor : undefined;

    if (!conversationId) {
      return sendResponse(res, {
        statusCode: 400,
        message: "conversationId is required",
      });
    }

    const result = await this.getMessageUseCase.execute({
      conversationId: conversationId as string,
      limit: limitNum,
      cursor: cursorStr,
    });
    sendResponse(res, {
      statusCode: 200,
      message: "Messages retrieved successfully",
      data: result,
    });
  });
}
