import { Socket } from "socket.io";
import { MessageRepositoryPrisma } from "../../infrastructure/repository/message/message.repository.prisma";

const messageRepo = new MessageRepositoryPrisma();
export function registerChatHandlers(socket: Socket) {
  const userId = socket.data.user.id;

  // 🔵 join
  socket.on("join_conversation", (conversationId: string) => {
    socket.join(`conversation_${conversationId}`);
    console.log("Joined conversation:", conversationId);
  });

  // 🟣 typing
  socket.on("typing", (receiverId: string) => {
    socket.to(`user_${receiverId}`).emit("chat:typing", {
      userId,
    });
  });

  // ✅ delivered
  socket.on("message:delivered", async ({ messageId, conversationId }) => {
    console.log("📦 Delivered:", messageId);

    await messageRepo.markAsDelivered(messageId);

    socket.to(`conversation_${conversationId}`).emit("message:delivered", {
      messageId,
      userId,
    });
  });

  // ✅ read
  socket.on("message:read", async ({ conversationId }) => {
    console.log("👁 Read:", conversationId);

    await messageRepo.markAsRead(conversationId);

    socket.to(`conversation_${conversationId}`).emit("message:read", {
      userId,
      conversationId,
    });
  });
}
