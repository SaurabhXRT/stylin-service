import { Database } from "../database/database.js";
import { MySQL } from "../database/postgresdb.js";

const centralDatabase: Database = new MySQL()

const databaseInitOptions = {
  database: process.env.DB_NAME || "",
  host: process.env.DB_HOST || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || "",
  dialect: process.env.DB_DIALECT || "",
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || "5"),
    min: parseInt(process.env.DB_POOL_MIN || "0"),
    acquire: parseInt(process.env.DB_POOL_ACQUIRE || "30000"),
    idle: parseInt(process.env.DB_POOL_IDLE || "10000"),
  },
  logging: process.env.DB_LOGGING === "true",
  timezone: process.env.DB_TIMEZONE || "+05:30",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+05:30",
  },
  ssl: {
    require: true,
    rejectUnauthorized: false
  }

}
centralDatabase.initInstance(databaseInitOptions)
export { centralDatabase, databaseInitOptions }