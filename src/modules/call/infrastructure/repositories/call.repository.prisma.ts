import prisma from "../../../../lib/prisma";
import { CallStatus } from "../../domain/entities/call.entity";
import { CallRepository } from "../../domain/repository/call.repository";

export class CallRepositoryPrisma implements CallRepository {
  async createCall({ callerId, receiverId, type }) {
    return prisma.call.create({
      data: {
        callerId,
        receiverId,
        type,
        status: "INITIATED",
      },
    });
  }

  async updateStatus(callId: string, status: CallStatus) {
    await prisma.call.update({
      where: { id: callId },
      data: { status },
    });
  }

  async markAsAccepted(callId: string) {
    await prisma.call.update({
      where: { id: callId },
      data: {
        status: CallStatus.ACCEPTED,
        startedAt: new Date(),
      },
    });
  }

  async markAsEnded(callId: string) {
    await prisma.call.update({
      where: { id: callId },
      data: {
        status: CallStatus.ENDED,
        endedAt: new Date(),
      },
    });
  }

  async markAsMissed(callId: string) {
    await prisma.call.update({
      where: { id: callId },
      data: {
        status: CallStatus.REJECTED,
        endedAt: new Date(),
      },
    });
  }

  async findById(callId: string) {
    return prisma.call.findUnique({
      where: { id: callId },
      include: {
        caller: {
          select: { id: true, name: true },
        },
        receiver: {
          select: { id: true, name: true },
        },
      },
    });
  }

  // 🔥 Cursor Pagination (Production)
  async getUserCalls(userId: string, limit = 20, cursor?: string) {
    const calls = await prisma.call.findMany({
      where: {
        OR: [{ callerId: userId }, { receiverId: userId }],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
      include: {
        caller: {
          select: { id: true, name: true },
        },
        receiver: {
          select: { id: true, name: true },
        },
      },
    });

    const nextCursor =
      calls.length === limit ? calls[calls.length - 1].id : null;

    return {
      data: calls,
      nextCursor,
    };
  }
}
