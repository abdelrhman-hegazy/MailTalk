import { AddContactUsecase } from "../application/addContact.usecase";
import { ContactRepositoryPrisma } from "../infrastructure/repository/contact.repository.prisma";
import { ContactController } from "../presentation/controller/contact.controller";

export function contactModule() {
  const contactRepo = new ContactRepositoryPrisma();
  const addContactUsecase = new AddContactUsecase(contactRepo);
  const contactController = new ContactController(addContactUsecase);
  return contactController;
}
