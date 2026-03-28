import { Response } from "express";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { CreateGroupUsecase } from "../../application/conversation/createGroup.usecase";
import { CreateGroupDto } from "../dtos/conversation.dto";
import { ConversationMemberRole } from "../../domain/entities/conversation/conversationMember.entity";
import { GetConversationsUsecase } from "../../application/conversation/getConversation.usecase";

export class ConversationController {
  constructor(
    private createGroupUsecase: CreateGroupUsecase,
    private getConversationsUsecase: GetConversationsUsecase,
  ) {}
  createGroup = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const { name, members }: CreateGroupDto = req.body;
    const membersArray = Array.isArray(members) ? members : [];
    membersArray.push({ userId: id, role: ConversationMemberRole.ADMIN });
    const result = await this.createGroupUsecase.execute(
      { name, members: membersArray },
      req.file,
    );
    sendResponse(res, {
      statusCode: 201,
      message: "Group created successfully",
      data: result,
    });
  });
  getConversations = catchAsync(async (req: AuthRequest, res: Response) => {
    // TODO: Implement get conversations logic
    const { id } = req.user;
    const { limit, cursor } = req.query;
    const limitNum = typeof limit === "string" ? parseInt(limit, 10) : 10;
    const cursorStr = typeof cursor === "string" ? cursor : undefined;
    const result = await this.getConversationsUsecase.execute(
      id,
      limitNum,
      cursorStr,
    );
    sendResponse(res, {
      statusCode: 200,
      message: "Conversations retrieved successfully",
      data: result,
    });
  });
}
