import { Response } from "express";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { AddContactUsecase } from "../../application/addContact.usecase";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";

export class ContactController {
  constructor(private readonly addContactUsecase: AddContactUsecase) {}
  addContact = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const { contactId } = req.query;
    const result = await this.addContactUsecase.excute(id, contactId as string);
    sendResponse(res, {
      statusCode: 201,
      message: "Contact added successfully",
      data: result,
    });
  });
}
