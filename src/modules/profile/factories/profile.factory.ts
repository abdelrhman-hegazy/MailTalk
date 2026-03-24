import { GetProfileUseCase } from "../application/getProfile.usecase";
import { ProfileRepositoryPrisma } from "../infrastructure/repository/profile.repository.prisma";
import { PrfileController } from "../presentation/controller/getProfile.controller";

export function profileModule() {
  const profileRepo = new ProfileRepositoryPrisma();
  const getProfileUsecase = new GetProfileUseCase(profileRepo);
  const getProfileController = new PrfileController(getProfileUsecase);
  return getProfileController;
}
