import { EndCallUseCase } from "../application/use-cases/endCall.usecase";
import { CallRepositoryPrisma } from "../infrastructure/repositories/call.repository.prisma";
import { CallController } from "../presentation/controller/call.controller";

export function callModule() {
  const callRepo = new CallRepositoryPrisma();
  const endCallUsecase = new EndCallUseCase(callRepo);
  return new CallController(endCallUsecase);
}
