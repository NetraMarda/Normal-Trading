import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { userRoute, invalidRoute } from "./routes/index.js";
import { connectMssql } from "./connection/index.js";
import { SERVER_PORT, logger, sync } from "./utils/index.js";

const app = express();

//middleware -(req,res,next)
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan(":status :method :url :response-time ms"));

// routes
//valid routes
app.use("/user", userRoute);

//invalid routes
app.use(invalidRoute);

// server
app.listen(SERVER_PORT, () => {
  logger.info(`Server running on port ${SERVER_PORT}`);
  connectMssql();
 // connectRedis();
  sync();
});
