import { getIO } from "../../../../../shared/socket/socket.server";
import { MessageSocketDto } from "../../../presentation/dtos/message.dto";
import { MessageRepositoryPrisma } from "../../repository/message/message.repository.prisma";
const messageRepositoryPrisma = new MessageRepositoryPrisma();
export class ChatSocketService {
  async emitNewMessage(conversationId: string, message: MessageSocketDto) {
    const io = getIO();

    try {
      const responses = await io
        .to(`conversation_${conversationId}`)
        .timeout(5000)
        .emitWithAck("message:new", message);

      console.log("✅ Delivered to:", responses.length);
      if (responses.length > 0) {
        await messageRepositoryPrisma.markAsDelivered(message.id);
        io.to(`conversation_${conversationId}`).emit("message:delivered", {
          messageId: message.id,
        });
      }
    } catch {
      console.log("❌ Delivery failed");
    }
  }

  emitNotification(usersId: string[], message: MessageSocketDto) {
    const io = getIO();

    for (const userId of usersId) {
      io.to(`user_${userId}`).emit("notification:new", message);
    }
  }
}
