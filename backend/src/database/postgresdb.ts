import dotenv from "dotenv-flow";
import { Sequelize, DataTypes, Transaction } from "sequelize";
import { Database, DbOptions } from "./database.js";
import logger from "../logger/logger.js";
dotenv.config({ silent: true });

const { DB_SSL } = process.env;

var instance: Sequelize | undefined;

export class MySQL implements Database {
  getInstance() {
    if (instance) return instance;
  }

  /**
   * @description - The connection options for the database.Can be DbOptions or a connection url
   */

  options: DbOptions | undefined | string;

  async initInstance(options: string | DbOptions) {
    this.options = options;
    if (instance) return;
    if (typeof options === "string") {
      instance = new Sequelize(options, {
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
        logging: (msg) => {
        logger.log(msg)
        },
        pool: {
          max: 10,
          min: 1,
        },
      });
      return;
    }
    instance = new Sequelize(
      options.database,
      options.username,
      options.password,
      {
        host: options.host,
        port: 6543,
        dialect: "postgres",
        logging: (msg) => {
          // console.log(msg);
        },
        timezone: "+05:30",
        ssl: DB_SSL as any,
      }
    );
  }

  async refresh() {
    if (!instance || !this.options) {
      throw new UnitializedOptionsError(
        "Options for Database have not been initialized"
      );
    }
    await instance.close();

    this.initInstance(this.options);
  }
  
  async performTransaction(
    transaction: (t: Transaction) => Promise<any>
  ): Promise<any> {
    if (!instance || !this.options) {
      throw new UnitializedOptionsError(
        "Options for Database have not been initialized"
      );
    }
    let trn = await instance.transaction();
    try {
      let result = await transaction(trn);
      trn.commit();
      return result;
    } catch (error) {
      trn.rollback();
      throw error;
    }
  }
}

export class UnitializedOptionsError extends Error {
  constructor(message: string) {
    super(message);
  }
}