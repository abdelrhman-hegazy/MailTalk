import { Server } from "socket.io";
import http from "http";
import { JwtService } from "../../modules/auth/infrastructure/services/jwt.service";
import { registerChatHandlers } from "./handlers/chat.handler";

let io: Server;
const jwtService = new JwtService();

export const initSocket = (server: http.Server) => {
  if (io) {
    console.log("io in condition:", io);

    return io;
  }

  io = new Server(server, {
    cors: { origin: "*" },
    transports: ["websocket"],
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwtService.verifyAccessToken(token);

      socket.data.user = {
        id: decoded.userId,
      };

      next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.data.user.id;
    socket.join(`user_${userId}`);

    registerChatHandlers(socket);

    socket.on("disconnect", (reason) => {
      console.log("User disconnected:", userId, reason);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};
