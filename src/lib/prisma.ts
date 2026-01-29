import { PrismaClient } from "../../prisma/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { config } from "../config";
neonConfig.webSocketConstructor = ws;

const connectionString = `${config.database.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = global.prisma || new PrismaClient({ adapter });

if (config.environment.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
