import { getIO } from "../../../../../shared/socket/socket.server";
import { MessageSocketDto } from "../../../presentation/dtos/message.dto";
export class ChatSocketService {
  async emitNewMessage(conversationId: string, message: MessageSocketDto) {
    const io = getIO();

    try {
      const responses = await io
        .to(`conversation_${conversationId}`)
        .timeout(5000)
        .emitWithAck("message:new", message);

      console.log("✅ Delivered to:", responses.length);

      // 🔥 ممكن تحدث DB هنا
      // await messageRepository.markAsDelivered(message.id);
    } catch {
      console.log("❌ Delivery failed");
    }
  }

  emitNotification(usersId: string[], message: MessageSocketDto) {
    const io = getIO();

    usersId.forEach((userId) => {
      io.to(`user_${userId}`).emit("notification:new", message);
    });
  }
}
