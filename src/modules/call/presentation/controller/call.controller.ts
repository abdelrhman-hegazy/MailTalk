import { Response } from "express";
import { GetCallsUseCase } from "../../application/use-cases/getCalls.usecase";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { sendResponse } from "../../../../shared/utils";
import { EndCallUseCase } from "../../application/use-cases/endCall.usecase";

export class CallController {
  constructor(
    private getCallsUseCase: GetCallsUseCase,
    private endCallUseCase: EndCallUseCase,
  ) {}
  async getCalls(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;
    const calls = await this.getCallsUseCase.execute(userId, limit, cursor);
    sendResponse(res, { message: "Calls retrieved successfully", data: calls });
  }

  async endCall(req: AuthRequest, res: Response) {
    const callId = req.params.id;
    await this.endCallUseCase.execute(callId as string);
    sendResponse(res, { message: "Call ended successfully" });
  }
}
