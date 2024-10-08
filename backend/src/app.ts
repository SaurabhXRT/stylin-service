import express, { Request, Response, Express } from "express";
import logger from "./logger/logger.js";
import bodyParser from "body-parser";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloGraphqlServer } from "./graphql/index.js";
import { AuthMiddleware } from "./middlewares/auth.js";
import { UserMiddleware } from "./middlewares/actors/auth.user.js";
import { StaffMiddleware } from "./middlewares/actors/auth.staff.js";
import { OwnerMiddleware } from "./middlewares/actors/auth.owner.js";
import { Context } from "./graphql/types.js";
import { graphqlUploadExpress } from 'graphql-upload-ts';
const server: Express = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cors({
    origin: process.env.CORS_WHITELISTED,
  })
);
server.use(graphqlUploadExpress());
const startgql = async () => {
  const initializegraphql = await createApolloGraphqlServer();
  server.use(
    "/graphql",graphqlUploadExpress(),
    expressMiddleware(initializegraphql, {
      context: async ({ req }): Promise<Context> => {
        await AuthMiddleware.verifyToken(req);
        const context: Context = {};

        if (req.userId) {
          await UserMiddleware.isUser(req);
          context.userId = req.userId;
          context.user = req.user;
        }
        if (req.staffId) {
          await StaffMiddleware.isStaff(req);
          context.staffId = req.staffId;
          context.staff = req.staff;
        }
        if (req.ownerId) {
          await OwnerMiddleware.isOwner(req);
          context.ownerId = req.ownerId;
          context.owner = req.owner;
        }
        return context;
      },
    })
  );
};
startgql();

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
    message: "Welcome to the salon management api",
  });
});

export default server;
