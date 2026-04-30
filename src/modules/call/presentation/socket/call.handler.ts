import { Socket } from "socket.io";
import { InitiateCallUseCase } from "../../application/use-cases/initiatCall.usecase";
import { CallSocketService } from "../../infrastructure/services/callSocket.service";
import { CallRepositoryPrisma } from "../../infrastructure/repositories/call.repository.prisma";
import { AcceptCallUseCase } from "../../application/use-cases/acceptCall.usecase";
import { EndCallUseCase } from "../../application/use-cases/endCall.usecase";

export function registerCallHandlers(socket: Socket) {
  const userId = socket.data.user.id;
  const callRepo = new CallRepositoryPrisma();
  const callSocketService = new CallSocketService();
  const initiateCallUseCase = new InitiateCallUseCase(callRepo);
  const acceptCallUseCase = new AcceptCallUseCase(callRepo);
  const endCallUseCase = new EndCallUseCase(callRepo);

  // 📞 start call
  socket.on("call:start", async ({ receiverId, type }) => {
    const call = await initiateCallUseCase.execute(userId, receiverId, type);

    callSocketService.emitIncomingCall(receiverId, {
      callId: call.id,
      callerId: userId,
      type,
    });
  });

  // ✅ accept
  socket.on("call:accept", async ({ callId, callerId }) => {
    await acceptCallUseCase.execute(callId);

    callSocketService.emitCallAccepted(callerId, {
      callId,
    });
  });

  // ❌ reject
  socket.on("call:reject", async ({ callId, callerId }) => {
    await endCallUseCase.execute(callId);

    socket.to(`user_${callerId}`).emit("call:rejected", {
      callId,
    });
  });

  // 🔁 offer
  socket.on("call:offer", ({ receiverId, offer }) => {
    callSocketService.emitOffer(receiverId, offer);
  });

  // 🔁 answer
  socket.on("call:answer", ({ callerId, answer }) => {
    callSocketService.emitAnswer(callerId, answer);
  });

  // 🧊 ICE
  socket.on("call:ice-candidate", ({ targetUserId, candidate }) => {
    callSocketService.emitICECandidate(targetUserId, candidate);
  });

  // 🔚 end
  socket.on("call:end", async ({ callId, receiverId }) => {
    await endCallUseCase.execute(callId);

    socket.to(`user_${receiverId}`).emit("call:ended", {
      callId,
    });
  });
}
