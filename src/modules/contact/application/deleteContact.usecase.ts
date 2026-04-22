import { AppError } from "../../../shared/utils";
import { ContactRepository } from "../domain/repository/contact.repository";

export class DeleteContactUsecase {
  constructor(private readonly contactRepo: ContactRepository) {}
  async execute(userId: string, contactId: string) {
    const contactExist = await this.contactRepo.isContactExists(
      userId,
      contactId,
    );
    if (!contactExist) {
      throw new AppError("Contact not found", 404, "NOT_FOUND");
    }
    await this.contactRepo.removeContact(userId, contactId);
  }
}
