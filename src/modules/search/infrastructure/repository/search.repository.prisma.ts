import prisma from "../../../../lib/prisma";

export class SearchRepository {
  async searchMessages(query: string, limit = 20) {
    return prisma.$queryRaw`
      SELECT "id", "content", "user"."name", "createdAt"
      FROM "Message"
      WHERE to_tsvector("content") @@ plainto_tsquery(${query})
      ORDER BY "createdAt" DESC
      LIMIT ${limit}
    `;
  }

  async searchUsers(query: string, limit = 10) {
    return prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        profile: {
          select: {
            bio: true,
            image: true,
          },
        },
      },
      take: limit,
    });
  }

  async searchConversations(query: string, limit = 10) {
    return prisma.conversation.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      take: limit,
      select: {
        id: true,
        name: true,
        members: {
          select: {
            name: true,
          },
        },
        messages: {
          select: {
            content: true,
          },
        },
      },
    });
  }
}
