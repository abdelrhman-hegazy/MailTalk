export class Call {
  constructor(
    public id: string,
    public callerId: string,
    public receiverId: string,
    public type: CallType,
    public status: CallStatus,
    public startedAt: Date,
    public endedAt: Date,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

export enum CallStatus {
  INITIATED = "INITIATED",
  RINGING = "RINGING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  ENDED = "ENDED",
}

export enum CallType {
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}
