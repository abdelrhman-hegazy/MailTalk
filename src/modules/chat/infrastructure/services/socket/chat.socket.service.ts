import { getIo } from "../../../../../shared/socket/socket.server";

export class ChatSocketService {
  emitNewMessage(conversationId: string, message: string) {
    const io = getIo();

    io.to(`conversation_${conversationId}`).emit("message:new", {
      message,
    });
  }
}
