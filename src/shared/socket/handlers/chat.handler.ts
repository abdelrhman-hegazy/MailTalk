import { Socket } from "socket.io";

export function registerChatHandlers(socket: Socket) {
  socket.on("join_conversation", (conversationId: string) => {
    socket.join(`conversation_${conversationId}`);
  });

  socket.on("typing", (data) => {
    socket.to(`conversation_${data.conversationId}`).emit("user_typing", {
      userId: data.userId,
    });
  });
}
