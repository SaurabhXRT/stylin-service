import logger from "../../logger/logger.js";
import { LeaveApplicationService } from "../../services/LeaveService.js";
const service = new LeaveApplicationService();

export const applyForLeaveController = async(_:any,payload:any,context:any) => {
    try{
        const staffId = context.staffId;
        if(!staffId){
            throw new Error("unauhtorized");
        }
        const leavedata = {
            staffId: staffId,
            leaveType: payload.leaveType,
            startDate: payload.startDate,
            endDate: payload.endDate,
            reason: payload.reason
        }
        const response = await service.applyForLeave(leavedata);
        return response;

    }catch(error){
        logger.log(error);
        throw new Error("error creating leave");
    }
}

export const getLeaveApplicationController = async (_:any, __:any, context:any) => {
    try {
      const staffId = context.staffId;
      if (!staffId) {
        throw new Error("Unauthorized");
      }
      const response = await service.getLeaveApplication(staffId);
      return response;
    } catch (error) {
      logger.log(error);
      throw new Error("Error getting leave application");
    }
};

export const updateLeaveApplicationController = async (_:any, payload:any, context:any) => {
    try {
      const ownerId = context.ownerId;
      if (!ownerId) {
        throw new Error("Unauthorized");
      }
      const applicationId = payload.applicationId;
      const status = payload.status;
      const response = await service.updateLeaveApplication(applicationId, status);
      return response;
    } catch (error) {
      logger.log(error);
      throw new Error("Error updating application status");
    }
};

export const getAllLeaveApplicationsWithStaffDetailsController = async (_:any, __:any, context:any) => {
    try {
      if (!context.owner) {
        throw new Error("Unauthorized access");
      }
  
      const response = await service.getAllLeaveApplicationsWithStaffDetails();
      return response;
    } catch (error) {
      logger.log(error);
      throw new Error("Error fetching leave applications with staff details");
    }
};
  