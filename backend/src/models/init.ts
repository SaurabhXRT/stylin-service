import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { StaffLoginSession } from "./LoginSession/Staff.loginsession.js";
import {User} from "./User/User.js";
import { Staff } from "./Staff/Staff.js";
import { Salon } from "./Salon/Salon.js";

export async function initDatabase(db: Database, dbOptions: DbOptions) {
    await db.initInstance(dbOptions);
    await UserLoginSession.sync();
    logger.log("userloginsession model initiated");
    await User.sync();
    logger.log("user model initiated successfully");

    User.hasMany(UserLoginSession, {
        foreignKey: "userId",
        as: "userloginsession"
    });

    UserLoginSession.belongsTo(User, {
        foreignKey: "userId",
        as: "users"
    });
    await Staff.sync();
    logger.log("staff model initiated successfully");
    Staff.hasMany(StaffLoginSession, {
        foreignKey: "staffId",
        as: "staffloginsession"
    });
    StaffLoginSession.belongsTo(Staff, {
        foreignKey: "staffId",
        as: "staff"
    });

    await Salon.sync();
    logger.log("salon model initiated successfully");

    Salon.hasMany(Staff, {
        foreignKey: "salonId",
        as: "staffs"
    });
    Staff.belongsTo(Salon, {
        foreignKey: "salonId",
        as: "salon"
    });

    User.hasOne(Salon, {
        foreignKey: "ownerId",
        as: "salon"
    });
    Salon.belongsTo(User, {
        foreignKey: "ownerId",
        as: "owner"
    });
    logger.log("all models initioiated successfully");
}