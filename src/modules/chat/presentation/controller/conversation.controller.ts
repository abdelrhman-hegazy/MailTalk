import { Response } from "express";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { CreateGroupUsecase } from "../../application/conversation/createGroup.usecase";
import { CreateGroupDto } from "../dtos/conversation.dto";
import { ConversationMemberRole } from "../../domain/entities/conversation/conversationMember.entity";

export class ConversationController {
  constructor(private createGroupUsecase: CreateGroupUsecase) {}
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
}
