import dotenv from "dotenv";
dotenv.config();

export const config = {
  environment: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  },
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
