import { ContactRepository } from "../domain/repository/contact.repository";

export class GetContactsUsecase {
  constructor(private readonly contactRepo: ContactRepository) {}
  async execute(userId: string) {
    return this.contactRepo.getContacts(userId);
  }
}
