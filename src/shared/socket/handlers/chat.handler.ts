import { Socket } from "socket.io";

export function registerChatHandlers(socket: Socket) {
  socket.on("join_conversation", (conversationId: string) => {
    socket.join(`conversation_${conversationId}`);
    console.log("Joined conversation:", conversationId);
  });

  socket.on("typing", (receiverId: string) => {
    const userId = socket.data.user.id;
    socket.to(`user_${receiverId}`).emit("chat:typing", { userId });
  });
}
