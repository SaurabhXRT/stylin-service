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

  async getAllSalons(){
    try{
      const salons = await Salon.findAll();
      const salondata = salons.map(salon => salon.toJSON());
      return salondata;

    }catch(error){
      logger.log(error);
      throw new Error("error getting all salons")
    }
  }

  async getsalonbyOwnerId(ownerId: any) {
    try {
      const salon = await Salon.findAll({
        where: {
          ownerId: ownerId,
        },
      });
      const salondata = salon.map(salon => salon.toJSON());
      return salondata;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting salon");
    }
  }

  async getSalonIdByOwnerId(ownerId: string) {
    try {
      const salon = await this.getsalonbyOwnerId(ownerId);
      if (!salon) {
        throw new Error("Salon not found for the provided ownerId");
      }
      return salon.id;
    } catch (error) {
      logger.log(error);
      throw new Error("Error fetching salonId by ownerId");
    }
  }

  async createStaff(staffData: any) {
    try {
      const password = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = await Staff.create({
        ...staffData,
        password: hashedPassword,
        dateOfJoining: new Date(),
      });

      return {
        staff: staff.toJSON(),
        plainPassword: password,
      };
    } catch (error) {
      logger.log(error);
      throw new Error("Error creating staff");
    }
  }

  async getSalonStaffs(salonId: any){
    try{
        const staff = await Staff.findAll({
            where: {
                salonId: salonId
            }
        });
        return staff;
    }catch(error){
        logger.log(error);
        throw new Error("error getting salonstaff");
    }
  }
}
