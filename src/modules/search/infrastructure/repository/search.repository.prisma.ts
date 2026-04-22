import prisma from "../../../../lib/prisma";

export class SearchRepositoryPrisma {
  async searchMessages(query: string, limit = 5, cursor?: string) {
    const messages = await prisma.message.findMany({
      where: {
        content: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        content: true,
        createdAt: true,
        conversation: {
          select: {
            id: true,
            name: true,
          },
        },
        sender: {
          select: {
            name: true,
          },
        },
      },
    });

    const nextCursor =
      messages.length === limit ? messages[messages.length - 1].id : null;

    return {
      data: messages,
      nextCursor,
    };
  }

  async searchUsers(query: string, limit = 10, cursor?: string) {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        name: true,
        createdAt: true,
        profile: {
          select: {
            bio: true,
            avatarUrl: true,
          },
        },
      },
    });

    const nextCursor =
      users.length === limit ? users[users.length - 1].id : null;

    return {
      data: users,
      nextCursor,
    };
  }

  async searchConversations(query: string, limit = 10, cursor?: string) {
    const conversations = await prisma.conversation.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      select: {
        id: true,
        name: true,
        updatedAt: true,
        members: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const nextCursor =
      conversations.length === limit
        ? conversations[conversations.length - 1].id
        : null;

    return {
      data: conversations,
      nextCursor,
    };
  }
}
