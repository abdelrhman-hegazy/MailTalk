import { Socket } from "socket.io";
import { MessageRepositoryPrisma } from "../../../modules/chat/infrastructure/repository/message/message.repository.prisma";

const messageRepo = new MessageRepositoryPrisma();

export function registerChatHandlers(socket: Socket) {
  const userId = socket.data.user.id;

  // 🔵 join
  socket.on("join_conversation", (conversationId: string) => {
    socket.join(`conversation_${conversationId}`);
    console.log("Joined:", conversationId);
  });

  // 🟣 typing
  socket.on("typing", ({ conversationId }) => {
    socket.to(`conversation_${conversationId}`).emit("chat:typing", {
      userId,
    });
  });

  // ✅ delivered
  socket.on("message:delivered", async ({ messageId }) => {
    console.log("📦 Delivered:", messageId);

    await messageRepo.markAsDelivered(messageId);
  });

  // ✅ read
  socket.on("message:read", async ({ conversationId }) => {
    console.log("👀 Read:", conversationId);

    await messageRepo.markConversationAsRead(conversationId, userId);

    socket.to(`conversation_${conversationId}`).emit("message:read", {
      userId,
      conversationId,
    });
  });
}
