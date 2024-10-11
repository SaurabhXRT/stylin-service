import { sendEmail } from "../email/email.js";
import logger from "../logger/logger.js";
import { Salon } from "../models/Salon/Salon.js";
import { Staff } from "../models/Staff/Staff.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class SalonService {
  generateRandomPassword() {
    return uuidv4().slice(0, 8);
  }
  async createSalon(salondata: any) {
    try {
      const salon = await Salon.create({
        ...salondata,
      });
      return salon.toJSON();
    } catch (error) {
      logger.log(error);
      throw new Error("error creating salon");
    }
  }

  async getAllSalons() {
    try {
      const salons = await Salon.findAll();
      const salondata = salons.map((salon) => salon.toJSON());
      return salondata;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting all salons");
    }
  }

  async getsalonbyOwnerId(ownerId: any) {
    try {
      const salon = await Salon.findAll({
        where: {
          ownerId: ownerId,
        },
      });
      const salondata = salon.map((salon) => salon.toJSON());
      return salondata;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting salon");
    }
  }

  async createStaff(staffData: any) {
    try {
      const userexist = await Staff.findOne({
        where: {
          name: staffData.name,
        },
      });
      if (userexist) {
        throw new Error("error name already exist");
      }
      const password = this.generateRandomPassword();
      console.log("new staff password", password);
      const hashedPassword = await bcrypt.hash(password, 10);

      await Staff.create({
        ...staffData,
        password: hashedPassword,
      });
      await sendEmail(staffData.email, staffData.name, staffData.email, password);
      const data = {
        message: "staff created successfully",
      };

      return data;
    } catch (error) {
      logger.log(error);
      throw new Error("Error creating staff");
    }
  }

  async getSalonStaffs(salonId: any) {
    try {
      const staff = await Staff.findAll({
        where: {
          salonId: salonId,
        },
      });
      const staffdata = staff.map(st => st.toJSON());
      return staffdata;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting salonstaff");
    }
  }
}
