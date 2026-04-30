import { Call, CallStatus, CallType } from "../../domain/entities/call.entity";
import { CallRepository } from "../../domain/repository/call.repository";

export class InitiateCallUseCase {
  constructor(private callRepo: CallRepository) {}

  async execute(callerId: string, receiverId: string, type: CallType) {
    const call = new Call(
      crypto.randomUUID(),
      callerId,
      receiverId,
      type,
      CallStatus.INITIATED,
      new Date(),
      null,
      new Date(),
      new Date(),
    );

    await this.callRepo.createCall(call);
    return call;
  }
}
