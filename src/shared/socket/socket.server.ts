import { Server } from "socket.io";
import http from "http";
import { JwtService } from "../../modules/auth/infrastructure/services/jwt.service";
import { registerChatHandlers } from "./handlers/chat.handler";
import { PresenceService } from "./presence.service";

let io: Server;
const jwtService = new JwtService();

export const initSocket = (server: http.Server) => {
  if (io) {
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
  const presenceService = new PresenceService();

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;

    console.log("User connected:", userId);

    socket.join(`user_${userId}`);

    presenceService.addUser(userId, socket.id);

    io.emit("user:online", { userId });

    registerChatHandlers(socket);

    socket.on("disconnect", async () => {
      const isOffline = presenceService.removeUser(userId, socket.id);

      if (isOffline) {
        io.emit("user:offline", {
          userId,
          lastSeen: new Date(),
        });

        // TODO: update DB
      }
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
