import dotenv from "dotenv";
dotenv.config();

export const {
  NODE_ENV,
  SERVER_PORT,
  DB_NAME,
  DB_SERVER,
  DB_USER,
  DB_PASSWORD,
  REDIS_HOST,
} = process.env;
