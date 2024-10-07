import logger from "../../logger/logger.js";
import { Staffservice } from "../../services/StaffService.js"; 
const staffservice = new Staffservice();

export const deleteStaffController = async (_:any, { staffId }:any, context:any) => {
  try {
    const ownerId = context.ownerId;
    if (!ownerId) {
      throw new Error("Unauthorized to delete staff");
    }
    const response = await staffservice.deleteStaff(ownerId, staffId);
    return response;
  } catch (error) {
    logger.log(error);
    throw new Error("Error deleting staff");
  }
};


export const uploadStaffImageController = async (_:any, { profileImage }: any, context: any) => {
    try {
      const staffId = context.staffId;
      if (!staffId) {
        throw new Error("Unauthorized to upload image");
      }
      const response = await staffservice.uploadStaffImage(staffId, profileImage);
      return response;
    } catch (error) {
      logger.log(error);
      throw new Error("Error uploading image");
    }
}