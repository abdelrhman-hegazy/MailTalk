import { Call, CallStatus } from "../entities/call.entity";
import { UserCallsResult } from "../types/callSocket.types";
// domain/repository/call.repository.ts
export interface CallRepository {
  createCall(data: {
    callerId: string;
    receiverId: string;
    type: "AUDIO" | "VIDEO";
  }): Promise<Call>;

  updateStatus(callId: string, status: CallStatus): Promise<void>;

  markAsAccepted(callId: string): Promise<void>;

  markAsEnded(callId: string): Promise<void>;

  markAsMissed(callId: string): Promise<void>;

  findById(callId: string): Promise<Call>;

  getUserCalls(
    userId: string,
    limit: number,
    cursor?: string,
  ): Promise<UserCallsResult>;
}
