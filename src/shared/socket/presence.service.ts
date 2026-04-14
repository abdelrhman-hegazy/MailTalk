const onlineUsers = new Map<string, Set<string>>();

export class PresenceService {
  addUser(userId: string, socketId: string) {
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId)!.add(socketId);
    console.log("Adding user:", userId, onlineUsers);
  }

  removeUser(userId: string, socketId: string) {
    const sockets = onlineUsers.get(userId);

    if (!sockets) return false;
    console.log("Removing user:", userId);
    console.log(sockets);
    sockets.delete(socketId);

    if (sockets.size === 0) {
      onlineUsers.delete(userId);
      return true; // user offline
    }

    return false;
  }

  isOnline(userId: string) {
    return onlineUsers.has(userId);
  }
}
