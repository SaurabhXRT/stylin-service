import server from "./app.js";
import logger from "./logger/logger.js";
import dotenv from "dotenv-flow";
dotenv.config();
import { initDatabase } from "./models/init.js";
import { centralDatabase, databaseInitOptions } from "./config/dbconfig.js";

initDatabase(centralDatabase, databaseInitOptions).catch((err) => {
  logger.error(err, "An error occured while initializing the database");
});

server.listen(process.env.PORT, () => {
  logger.log("Server started listening on " + process.env.PORT);
});



