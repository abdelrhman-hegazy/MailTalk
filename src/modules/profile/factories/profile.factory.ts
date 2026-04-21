import { CloudinaryService } from "../../upload/infrastructure/storage/cloudinary.storage";
import { GetProfileUseCase } from "../application/getProfile.usecase";
import { UpdateProfileUseCase } from "../application/updateProfile.usecase";
import { ProfileRepositoryPrisma } from "../infrastructure/repository/profile.repository.prisma";
import { ProfileController } from "../presentation/controller/profile.controller";

export function profileModule() {
  const profileRepo = new ProfileRepositoryPrisma();
  const getProfileUsecase = new GetProfileUseCase(profileRepo);
  const uploadFileService = new CloudinaryService();
  const updateProfileUsecase = new UpdateProfileUseCase(
    profileRepo,
    uploadFileService,
  );
  const profileController = new ProfileController(
    getProfileUsecase,
    updateProfileUsecase,
  );
  return profileController;
}
