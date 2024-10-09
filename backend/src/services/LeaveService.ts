import { Staff } from "../models/Staff/Staff.js";
import logger from "../logger/logger.js";
import { LeaveApplication } from "../models/Application/LeaveApplication.js";

export class LeaveApplicationService {
  async applyForLeave(leavedata: any) {
    try {
      const leave = await LeaveApplication.create({
        ...leavedata,
      });
      return leave.toJSON();
    } catch (error) {
      logger.log(error);
      throw new Error("error creating leave");
    }
  }

  async getLeaveApplication(staffId: string) {
    try {
      const leaveapplication = await LeaveApplication.findAll({
        where: {
          staffId: staffId,
        },
      });
      const leavedata = leaveapplication.map((leave) => leave.toJSON());
      return leavedata;
    } catch (error) {
      logger.log(error);
      throw new Error("error getting leave application");
    }
  }

  async updateLeaveApplication(applicationId: string, status: string) {
    try {
      const [updated] = await LeaveApplication.update(
        { status },
        {
          where: {
            id: applicationId,
          },
        }
      );

      if (updated) {
        const updatedApplication = await LeaveApplication.findByPk(applicationId);
        return updatedApplication.toJSON();
      }
    } catch (error) {
      logger.log(error);
      throw new Error("error updating application status");
    }
  }

  async getAllLeaveApplicationsWithStaffDetails() {
    try {
      const leaveApplications = await LeaveApplication.findAll({
        include: [
          {
            model: Staff,
            as: "staff", 
            attributes: ["id", "name", "email", "role", "contactNumber"], 
          },
        ],
      });
      
      const leaveApplicationsData = leaveApplications.map((leaveApp) => leaveApp.toJSON());
      return leaveApplicationsData;
    } catch (error) {
      logger.log(error);
      throw new Error("Error fetching leave applications with staff details");
    }
  }
}
