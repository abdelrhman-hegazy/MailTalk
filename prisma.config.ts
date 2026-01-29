import { defineConfig } from "prisma/config";
import { config } from "./src/config";
export default defineConfig({
  schema: "prisma/schema/schema.prisma",
  datasource: {
    url: config.database.DATABASE_URL!,
  },
});
