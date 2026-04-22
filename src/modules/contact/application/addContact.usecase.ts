import { AppError } from "../../../shared/utils";
import { ContactRepository } from "../domain/repository/contact.repository";

export class AddContactUsecase {
  constructor(private readonly contactRepo: ContactRepository) {}
  async excute(userId: string, contactId: string) {
    if (userId === contactId) {
      throw new AppError("You cannot add yourself", 400, "invalid_input");
    }

    const exists = await this.contactRepo.isContactExists(userId, contactId);
    if (exists) {
      throw new AppError("Already in contacts", 400, "duplicate_entry");
    }

    return this.contactRepo.addContact(userId, contactId);
  }
}
