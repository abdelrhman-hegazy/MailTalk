import { getIO } from "../../../../../shared/socket/socket.server";
import { MessageSocketDto } from "../../../presentation/dtos/sendMessage.dto";
export class ChatSocketService {
  async emitNewMessage(
    conversationId: string,
    receiverId: string,
    message: MessageSocketDto,
  ) {
    const io = getIO();
    io.to(`conversation_${conversationId}`)
      .timeout(10000)
      .emit(
        "message:new",
        message,
        (
          err: Error,
          responses: Array<{ socketId: string; status: string }>,
        ) => {
          if (err) {
            console.log("error", err);
            console.log("❌ Not delivered");
          } else {
            console.log("✅ Delivered to:", responses.length);
          }
        },
      );

    io.to(`user_${receiverId}`).emit("notification:new", {
      conversationId,
      message,
    });
  }
}
