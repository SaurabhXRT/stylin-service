import logger from "../../logger/logger.js";
import { Staffservice } from "../../services/StaffService.js"; 
const staffservice = new Staffservice();

export const deleteStaffController = async (_:any, { staffId }:any, context:any) => {
  try {
    const ownerId = context.ownerId;
    if (!ownerId) {
      throw new Error("Unauthorized to delete staff");
    }
    const response = await staffservice.deleteStaff(staffId);
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
      console.log(profileImage);
      const response = await staffservice.uploadStaffImage(staffId, profileImage);
      return response;
    } catch (error) {
      logger.log(error);
      throw new Error("Error uploading image");
    }
}

export const recordStaffServiceController = async(_:any,{staffId}:any,context:any) => {
  try{
    const userId = context.userId;
    if(!userId){
      throw new Error("you are not authenticated");
    }
    if(!staffId){
      throw new Error("staffid is required");
    }
    const response = await staffservice.recordStaffService(staffId,userId);
    return response;

  }catch(error){
    logger.log(error);
    throw new Error("error in recording staff service");
  }
}


export const getStaffClientServiceController = async(_:any, { staffId, period }: any, context:any) => {
  try{
    const ownerId = context.ownerId;
    if(!ownerId){
      throw new Error("you are not authorized");
    }
    if(!staffId || !period){
      throw new Error("staffid and period are record");
    }
    const response = await staffservice.getStaffClientService(staffId,period);
    return response;

  }catch(error){
    logger.log(error);
    throw new Error("error getting staff service to client");
  }
}


export const getSalonOfStaffController = async(_:any,__:any,context:any) => {
  try{
    const staffId = context.staffId;
    if(!staffId){
      throw new Error("you are not authorized");
    }
    const response = await staffservice.getSalonOfStaffService(staffId);
    return response;

  }catch(error){
    logger.log(error);
    throw new Error("error getting salon of staff");
  }
}

export const getStaffOwnProfileController = async(_:any,__:any,context:any) => {
  try{
    const staffId = context.staffId;
    if(!staffId){
      throw new Error("you are not authorized");
    }
    const response = await staffservice.getStaffProfile(staffId);
    return response;

  }catch(error){
    logger.log(error);
    throw new Error("error getting staff profile");
  }
}