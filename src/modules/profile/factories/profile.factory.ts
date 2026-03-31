import { GetProfileUseCase } from "../application/getProfile.usecase";
import { UpdateAvaterUseCase } from "../application/updateAvater.usecase";
import { UpdateProfileUseCase } from "../application/updateProfile.usecase";
import { ProfileRepositoryPrisma } from "../infrastructure/repository/profile.repository.prisma";
import { ProfileController } from "../presentation/controllers/profile.controller";

export function profileModule() {
  const profileRepo = new ProfileRepositoryPrisma();
  const getProfileUsecase = new GetProfileUseCase(profileRepo);
  const updateProfileUsecase = new UpdateProfileUseCase(profileRepo);
  const updateAvatarUsecase = new UpdateAvaterUseCase(profileRepo);
  const getProfileController = new ProfileController(
    getProfileUsecase,
    updateProfileUsecase,
    updateAvatarUsecase,
  );
  return getProfileController;
}
