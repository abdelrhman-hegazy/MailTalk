import { Response } from "express";
import { GetCallsUseCase } from "../../application/use-cases/getCalls.usecase";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { sendResponse } from "../../../../shared/utils";

export class CallController {
  constructor(private getCallsUseCase: GetCallsUseCase) {}
  async getCalls(req: AuthRequest, res: Response) {
    const userId = req.user?.id;
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;
    const calls = await this.getCallsUseCase.execute(userId, limit, cursor);
    sendResponse(res, { message: "Calls retrieved successfully", data: calls });
  }
}
