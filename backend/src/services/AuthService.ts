import { Model } from "sequelize";
import logger from "../logger/logger.js";
import { UserService } from "./UserService.js";
import jwt from "jsonwebtoken";
import { UserLoginSession } from "../models/LoginSession/User.Loginsession.js";
import { StaffLoginSession } from "../models/LoginSession/Staff.loginsession.js";
import bcrypt from "bcrypt";
const userservice = new UserService();

export class UserAuthService {
  async Usersignup(userdata: any) {
    try {
      const usernameExists = await userservice.getUserbyusername(
        userdata.username
      );

      if (usernameExists) {
        throw new Error("Username already exists");
      }
      const hashedPassword = await bcrypt.hash(userdata.password, 10);
      const userWithHashedPassword = {
        ...userdata,
        password: hashedPassword,
      };
      const user = await userservice.userCreate(userWithHashedPassword);
      let payload: any = {};
      if (user.role === "User") {
        payload.userId = user.id;
      } else if (user.role === "Owner") {
        payload.ownerId = user.id;
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const loginSession = await UserLoginSession.create({
        userId: user.id,
        token: token,
      });
      return loginSession;
    } catch (error) {
      logger.log(error);
      throw new Error("error occured while creating user");
    }
  }

  async userLogin(username: string, password: string) {
    try {
      const user = await userservice.getUserByUsernameAndPassword(
        username,
        password
      );
      if (!user) {
        throw new Error("invalid credentials");
      }
      let payload: any = {};
      if (user.role === "User") {
        payload.userId = user.id;
      } else if (user.role === "Owner") {
        payload.ownerId = user.id;
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      const loginSession = await UserLoginSession.create({
        userId: user.id,
        token: token,
      });
      return loginSession;
    } catch (error) {
      logger.log(error);
      throw new Error("error while logging in");
    }
  }

  async staffLogin(email: string, password: string) {
    try {
      const staff = await userservice.getStaffByEmailAndPassword(
        email,
        password
      );
      if (!staff) {
        throw new Error("invalid credentials");
      }
      const token = jwt.sign(
        { staffId: staff.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      const loginSession = await StaffLoginSession.create({
        userId: staff.id,
        token: token,
      });
      return loginSession;
    } catch (error) {
      logger.log(error);
      throw new Error("error in logging in");
    }
  }
}
