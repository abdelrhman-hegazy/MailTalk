import { Router } from "express";
import { authMiddleware } from "../../../../shared/middlewares/auth.middleware";
import { searchModule } from "../../factories/search.factories";

const router = Router();
const searchController = searchModule();

router.get("/", authMiddleware, searchController.search);

export { router as searchRouter };
