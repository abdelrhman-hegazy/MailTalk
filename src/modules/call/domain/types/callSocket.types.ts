import { Call, CallType } from "../entities/call.entity";

export interface IncomingCallData {
  callId: string;
  callerId: string;
  callerName?: string;
  type: CallType.AUDIO | CallType.VIDEO;
}

export interface CallAcceptedData {
  callId: string;
}

export interface RTCIceCandidateInit {
  candidate: string;
  sdpMLineIndex?: number;
  sdpMid?: string;
}

export interface RTCSessionDescriptionInit {
  type: "offer" | "answer";
  sdp: string;
}

export interface CallWithUsers extends Call {
  caller: { id: string; name: string };
  receiver: { id: string; name: string };
}

export interface UserCallsResult {
  data: CallWithUsers[];
  nextCursor: string | null;
}
