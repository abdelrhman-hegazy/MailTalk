import { Server } from "socket.io";
import http from "http";
import { registerChatHandlers } from "./handlers/chat.handler";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");

    registerChatHandlers(socket);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};
