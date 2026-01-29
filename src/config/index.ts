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
  token: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  },
  email: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
};
