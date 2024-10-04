import express, { Request, Response, Express } from "express";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
const server: Express = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

process.on("uncaughtException", (err) => {
  logger.error("An error occured which was not caught");
  logger.error(err);
});

process.on("unhandledRejection", (err) => {
  logger.error("An  unhandled rejection was caught");
  logger.error(err);
});

server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the stockanalytics API",
  });
});

export default server;