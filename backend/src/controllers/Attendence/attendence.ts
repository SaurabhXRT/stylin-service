import logger from "../../logger/logger.js";
import { AttendenceService } from "../../services/AttendenceService.js";
const attendeceservice = new AttendenceService();

export const createAttendenceTimingsController = async (_: any,payload: any,context: any) => {
  try {
    if (!context.owner) {
      throw new Error("unauthorized");
    }
    const attendecedata = {
      salonId: payload.salonId,
      startTime: payload.startTime,
      endTime: payload.endTime,
    };
    const response = await attendeceservice.createAttendenceTimings(
      attendecedata
    );
    return response;
  } catch (error) {
    logger.log(error);
    throw new Error("error creating attendece timings");
  }
};

export const checkTodaysAttendanceController = async (_: any,__: any, context: any) => {
  try {
    const staffId = context.staffId;
    if (!staffId) {
      throw new Error("Unauthorized");
    }
    const attendanceExists = await attendeceservice.checkTodaysAttendance(
      staffId
    );
    return { exists: !!attendanceExists };
  } catch (error) {
    logger.log(error);
    throw new Error("Error checking today's attendance");
  }
};

export const recordAttendanceController = async ( _: any, payload: any, context: any) => {
  try {
    console.log("recieved payload from the frontend",payload)
    const staffId = context.staffId
    if (!staffId) {
      throw new Error("Unauthorized");
    }
    const response = await attendeceservice.recordAttendance(
      staffId,
      payload.location,
      payload.capturedImage
    );
    return response;
  } catch (error) {
    logger.log(error);
    throw new Error("error in creating attendence ");
  }
};


export const getAttendenceRecordOfStaffController = async(_:any,{staffId}: any, context:any) => {
  try{
    if(!context.owner){
      throw new Error("unauthorized");
    }
    const response = await attendeceservice.getAttendenceRecordOfStaff(staffId);
    return response;

  }catch(error){
    logger.log(error);
    throw new Error("error getting attendence record");
  }
}
