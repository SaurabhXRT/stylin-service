import express from "express";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
var server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(express.json());
process.on("uncaughtException", function(err) {
    logger.error("An error occured which was not caught");
    logger.error(err);
});
process.on("unhandledRejection", function(err) {
    logger.error("An  unhandled rejection was caught");
    logger.error(err);
});
server.get("/", function(req, res) {
    res.json({
        message: "Welcome to the stockanalytics API"
    });
});
export default server;
