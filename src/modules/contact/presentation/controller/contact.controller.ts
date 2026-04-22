import { Response } from "express";
import { catchAsync, sendResponse } from "../../../../shared/utils";
import { AuthRequest } from "../../../../shared/middlewares/auth.middleware";
import { AddContactUsecase } from "../../application/addContact.usecase";
import { GetContactsUsecase } from "../../application/getContacts.usecase";
import { DeleteContactUsecase } from "../../application/deleteContact.usecase";

export class ContactController {
  constructor(
    private readonly addContactUsecase: AddContactUsecase,
    private readonly getContactsUsecase: GetContactsUsecase,
    private readonly deleteContactUsecase: DeleteContactUsecase,
  ) {}
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
  getContacts = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const result = await this.getContactsUsecase.execute(id);
    sendResponse(res, {
      statusCode: 200,
      message: "Contacts retrieved successfully",
      data: result,
    });
  });
  deleteContact = catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.user;
    const { contactId } = req.query;
    await this.deleteContactUsecase.execute(id, contactId as string);
    sendResponse(res, {
      statusCode: 200,
      message: "Contact deleted successfully",
    });
  });
}
