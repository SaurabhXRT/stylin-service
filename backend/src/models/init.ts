import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { OwnerLoginSession } from "./LoginSession/Owner.loginsession.js";
import { StaffLoginSession } from "./LoginSession/Staff.loginsession.js";
import {User} from "./User/User.js";
import { Owner } from "./Owner/Owner.js";
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

    await Owner.sync();
    logger.log("owner model initiated sucessfully");
    await Staff.sync();
    logger.log("staff model initiated successfully");

    Owner.hasMany(OwnerLoginSession, {
        foreignKey: "ownerId",
        as: "ownerloginsession"
    });
    OwnerLoginSession.belongsTo(Owner, {
        foreignKey: "OwnerId",
        as: "owner"
    });
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

    Owner.hasOne(Salon, {
        foreignKey: "ownerId",
        as: "salon"
    });
    Salon.belongsTo(Owner, {
        foreignKey: "ownerId",
        as: "owner"
    });
    logger.log("all models initioiated successfully");
}