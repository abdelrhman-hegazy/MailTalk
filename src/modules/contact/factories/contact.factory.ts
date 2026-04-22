import { AddContactUsecase } from "../application/addContact.usecase";
import { ContactRepositoryPrisma } from "../infrastructure/repository/contact.repository.prisma";
import { ContactController } from "../presentation/controller/contact.controller";
import { GetContactsUsecase } from "../application/getContacts.usecase";
import { DeleteContactUsecase } from "../application/deleteContact.usecase";

export function contactModule() {
  const contactRepo = new ContactRepositoryPrisma();
  const addContactUsecase = new AddContactUsecase(contactRepo);
  const getContactsUsecase = new GetContactsUsecase(contactRepo);
  const deleteContactUsecase = new DeleteContactUsecase(contactRepo);
  const contactController = new ContactController(
    addContactUsecase,
    getContactsUsecase,
    deleteContactUsecase,
  );
  return contactController;
}
