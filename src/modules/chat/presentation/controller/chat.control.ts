import { SendMessageUseCase } from "../../application/sendMessage.usecase";
import { catchAsync } from "../../../../shared/utils";
import { Request, Response } from "express";
import { sendResponse } from "../../../../shared/utils";
import { SendMessageDTO } from "../dtos/sendMessage.dto";
export class ChatController {
  constructor(private sendMessageUseCase: SendMessageUseCase) {}
  sendMessage = catchAsync(async (req: Request, res: Response) => {
    const { senderId, receiver, conversationId, content }: SendMessageDTO =
      req.body;
    const result = await this.sendMessageUseCase.execute({
      senderId,
      receiver,
      conversationId,
      content,
    });
    sendResponse(res, {
      statusCode: 200,
      message: "Message sent successfully",
      data: result,
    });
  });
}
