import { Service } from "../models/Service/StaffService.js";
import logger from "../logger/logger.js";
import { Salon } from "../models/Salon/Salon.js";
import { Staff } from "../models/Staff/Staff.js";
import { User } from "../models/User/User.js";
import cloudinary from "cloudinary";
import { Op } from "sequelize";

cloudinary.v2.config({
  cloud_name: "dar4ws6v6",
  api_key: "131471632671278",
  api_secret: "d0UW2ogmMnEEMcNVcDpzG33HKkY",
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  url: string;
}

export class Staffservice {
  async getStaffProfile(staffId: any) {
    try {
      const staff = await Staff.findByPk(staffId);
      return staff.toJSON();
    } catch (error) {
      logger.log(error);
      throw new Error("error getting staff profile");
    }
  }

  async deleteStaff(ownerId: any, staffId: any) {
    try {
      const staff = await Staff.findOne({ where: { id: staffId } });
      if (!staff) {
        throw new Error("Staff member not found");
      }
      const salon = await Salon.findOne({
        where: { id: staff.salonId, ownerId: ownerId },
      });

      if (!salon) {
        throw new Error("Not authorized to delete this staff");
      }

      await Staff.destroy({ where: { id: staffId } });
      return "Staff member deleted successfully.";
    } catch (error) {
      logger.log(error);
      throw new Error("Error deleting staff");
    }
  }

  async uploadStaffImage(staffId: any, file: any) {
    try {
      const staff = await Staff.findByPk(staffId);
      if (!staff) {
        throw new Error("Staff member not found");
      }
      console.log(file);
      const { createReadStream } = await file;
      const stream = createReadStream();
      const result: CloudinaryUploadResult = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: "staff_images" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as CloudinaryUploadResult);
              }
            }
          );
          stream.pipe(uploadStream);
        }
      );

      staff.profileImage = result.secure_url;
      await staff.save();

      return staff;
    } catch (error) {
      logger.log(error);
      throw new Error("Error uploading image");
    }
  }

  async recordStaffService(staffId: string, userId: string){
    try{
      await Service.create({
        staffId,
        userId,
        dateOfService: new Date(),
      });
      const data = {
        message: "staff service added successfully",
      };
      return data;
    }catch(error){
      logger.log(error);
      throw new Error("error in recording staff service");
    }
  }


  async getStaffClientService(staffId: string, period:any){
    try {
      const where = {
        staffId,
        dateOfService: {},
      };
      const today = new Date();
      if (period === "daily") {
        where.dateOfService = {
          [Op.gte]: new Date(today.setHours(0, 0, 0, 0)), 
        };
      } else if (period === "monthly") {
        where.dateOfService = {
          [Op.gte]: new Date(today.getFullYear(), today.getMonth(), 1), 
        };
      }

      const count = await Service.count({ where });
      return count;

    }catch(error){
      logger.log(error);
      throw new Error("error getting staff client service");
    }
  }

  async getSalonOfStaffService(staffId: string){
    try{
      const staffWithSalon = await Staff.findOne({
        where: { id: staffId },
        include: [
          {
            model: Salon,
            as: 'salon', 
            include: [
              {
                model: User,
                as: 'owner',
                attributes: ['id', 'name', 'email'],
              },
            ], 
          },
        ],
      });
  
      if (!staffWithSalon) {
        throw new Error(`Staff with ID ${staffId} not found`);
      }
      const data = staffWithSalon.toJSON();
      logger.log(data)
      return data.salon; 
    }catch(error){
      logger.log(error);
      throw new Error("error getting salon of staff");
    }
  }
}
