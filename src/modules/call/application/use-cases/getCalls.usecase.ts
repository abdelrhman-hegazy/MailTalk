import { CallRepository } from "../../domain/repository/call.repository";

export class GetCallsUseCase {
  constructor(private callRepo: CallRepository) {}

  async execute(userId: string, limit: number, cursor?: string) {
    return this.callRepo.getUserCalls(userId, limit, cursor);
  }
}
