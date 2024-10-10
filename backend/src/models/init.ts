import { Database, DbOptions } from "../database/database.js";
import dotenv from "dotenv-flow";
dotenv.config();
import logger from "../logger/logger.js";
import { UserLoginSession } from "./LoginSession/User.Loginsession.js";
import { StaffLoginSession } from "./LoginSession/Staff.loginsession.js";
import { User } from "./User/User.js";
import { Staff } from "./Staff/Staff.js";
import { Salon } from "./Salon/Salon.js";
import { Service } from "./Service/StaffService.js";
import { Feedback } from "./UserFeedback/UserFeedback.js";
import { CityDetail } from "./Cities/cities.js";
import { LeaveApplication } from "./Application/LeaveApplication.js";
import { Attendance } from "./Attendence/Attendence.js";
import { AttendanceTimings } from "./Attendence/AttendenceTimings.js";

export async function initDatabase(db: Database, dbOptions: DbOptions) {
  await db.initInstance(dbOptions);
  await UserLoginSession.sync();
  logger.log("userloginsession model initiated");
  await User.sync();
  logger.log("user model initiated successfully");
  await CityDetail.sync();
  logger.log("citydetail model initiated successfully");
  User.hasMany(UserLoginSession, {
    foreignKey: "userId",
    as: "userloginsession",
  });

  UserLoginSession.belongsTo(User, {
    foreignKey: "userId",
    as: "users",
  });
  await Staff.sync();
  logger.log("staff model initiated successfully");
  await StaffLoginSession.sync();
  logger.log("staffloginsession created successfully");
  Staff.hasMany(StaffLoginSession, {
    foreignKey: "staffId",
    as: "staffloginsession",
  });
  StaffLoginSession.belongsTo(Staff, {
    foreignKey: "staffId",
    as: "staff",
  });

  await Salon.sync();
  logger.log("salon model initiated successfully");

  Salon.hasMany(Staff, {
    foreignKey: "salonId",
    as: "staffs",
  });
  Staff.belongsTo(Salon, {
    foreignKey: "salonId",
    as: "salon",
  });

  User.hasMany(Salon, {
    foreignKey: "ownerId",
    as: "salon",
  });
  Salon.belongsTo(User, {
    foreignKey: "ownerId",
    as: "owner",
  });

  await Feedback.sync();
  logger.log("feedback model initiated successfully");
  await Service.sync();
  logger.log("service model initiated successfully");

  User.hasMany(Feedback, {
    foreignKey: "userId",
    as: "feedbacks",
  });
  Feedback.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Staff.hasMany(Feedback, {
    foreignKey: "staffId",
    as: "stafffeedbacks",
  });
  Feedback.belongsTo(Staff, {
    foreignKey: "staffId",
    as: "staff",
  });

  User.hasMany(Service, {
    foreignKey: "userId",
    as: "services",
  });
  Service.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  Staff.hasMany(Service, {
    foreignKey: "staffId",
    as: "staffservices",
  });
  Service.belongsTo(Staff, {
    foreignKey: "staffId",
    as: "staff",
  });

  await LeaveApplication.sync();
  logger.log("leaveapplication initiated successfully");

  Staff.hasMany(LeaveApplication, {
    foreignKey: "staffId",
    as: "leaveapplication",
  });
  LeaveApplication.belongsTo(Staff, {
    foreignKey: "staffId",
    as: "staff",
  });
  await Attendance.sync();
  logger.log("attendence model initiated succesfulyy");
  await AttendanceTimings.sync();
  logger.log("attendece tiings model initiated succesfully ");
  Staff.hasMany(Attendance, {
    foreignKey: "staffId",
    as: "attendence",
  });

  Attendance.belongsTo(Staff, {
    foreignKey: "staffId",
    as: "staff",
  });

  Salon.hasOne(AttendanceTimings, {
    foreignKey: "salonId",
    as: "attendencetimings",
  });

  AttendanceTimings.belongsTo(Salon, {
    foreignKey: "salonId",
    as: "salon",
  });

  logger.log("all models initioiated successfully");
}
