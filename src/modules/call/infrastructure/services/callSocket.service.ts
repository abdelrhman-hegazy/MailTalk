import { getIO } from "../../../../shared/socket/socket.server";
import {
  IncomingCallData,
  CallAcceptedData,
  RTCIceCandidateInit,
  RTCSessionDescriptionInit,
} from "../../domain/types/callSocket.types";

export class CallSocketService {
  emitIncomingCall(receiverId: string, data: IncomingCallData) {
    const io = getIO();
    io.to(`user_${receiverId}`).emit("call:incoming", data);
  }

  emitCallAccepted(callerId: string, data: CallAcceptedData) {
    const io = getIO();
    io.to(`user_${callerId}`).emit("call:accepted", data);
  }

  emitICECandidate(userId: string, candidate: RTCIceCandidateInit) {
    const io = getIO();
    io.to(`user_${userId}`).emit("call:ice-candidate", candidate);
  }

  emitOffer(userId: string, offer: RTCSessionDescriptionInit) {
    const io = getIO();
    io.to(`user_${userId}`).emit("call:offer", offer);
  }

  emitAnswer(userId: string, answer: RTCSessionDescriptionInit) {
    const io = getIO();
    io.to(`user_${userId}`).emit("call:answer", answer);
  }
}
