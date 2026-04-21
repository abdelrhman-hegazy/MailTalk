import { SearchController } from "../presentation/controller/search.controller";
import { SearchUseCase } from "../application/search.usecase";
import { SearchRepositoryPrisma } from "../infrastructure/repository/search.repository.prisma";

export function searchModule() {
  const searchRepository = new SearchRepositoryPrisma();
  const searchUseCase = new SearchUseCase(searchRepository);
  const searchController = new SearchController(searchUseCase);
  return searchController;
}
