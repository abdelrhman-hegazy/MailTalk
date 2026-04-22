export interface ContactRepository {
  addContact(userId: string, contactId: string): Promise<void>;
  removeContact(userId: string, contactId: string): Promise<void>;
  isContactExists(userId: string, contactId: string): Promise<boolean>;
  getContacts(userId: string): Promise<string[]>;
}
