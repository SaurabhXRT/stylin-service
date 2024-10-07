import logger from "../logger/logger.js";
import { Salon } from "../models/Salon/Salon.js";
import { Staff } from "../models/Staff/Staff.js";
import cloudinary from "cloudinary";

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
      return staff;
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
}
