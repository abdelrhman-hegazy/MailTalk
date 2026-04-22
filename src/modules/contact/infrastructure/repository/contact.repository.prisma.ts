import prisma from "../../../../lib/prisma";

export class ContactRepositoryPrisma {
  async addContact(userId: string, contactId: string) {
    return prisma.contact.create({
      data: { userId, contactUserId: contactId },
    });
  }

  async removeContact(userId: string, contactId: string) {
    return prisma.contact.delete({
      where: {
        userId_contactUserId: {
          userId,
          contactUserId: contactId,
        },
      },
    });
  }

  async getContacts(userId: string) {
    return prisma.contact.findMany({
      where: { userId },
      include: {
        contact: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarUrl: true,
                isOnline: true,
                lastSeen: true,
              },
            },
          },
        },
      },
    });
  }

  async isContactExists(userId: string, contactId: string) {
    return prisma.contact.findUnique({
      where: {
        userId_contactUserId: {
          userId,
          contactUserId: contactId,
        },
      },
    });
  }
}
