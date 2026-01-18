import dotenv from "dotenv";
dotenv.config();

export const config = {
  enviroment: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  },
};
