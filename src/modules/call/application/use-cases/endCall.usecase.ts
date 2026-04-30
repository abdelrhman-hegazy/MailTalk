import { CallStatus } from "../../domain/entities/call.entity";
import { CallRepository } from "../../domain/repository/call.repository";

export class EndCallUseCase {
  constructor(private callRepo: CallRepository) {}

  async execute(callId: string) {
    await this.callRepo.updateStatus(callId, CallStatus.ENDED);
  }
}
