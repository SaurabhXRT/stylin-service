import { Staff } from "../models/Staff/Staff.js";
import logger from "../logger/logger.js";
import { LeaveApplication } from "../models/Application/LeaveApplication.js";

export class LeaveApplicationService {
  async applyForLeave(leavedata: any) {
    try {
      const existingleave = await LeaveApplication.findOne({
        where: {
          staffId: leavedata.staffId,
        },
      });
      if(existingleave){
        throw new Error("aleady there is a leave existing of this staff");
      }
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
        const updatedApplication = await LeaveApplication.findByPk(
          applicationId
        );
        if (updatedApplication) {
          const applicationData = updatedApplication.toJSON();
          if (status === "Approved") {
            await Staff.update(
              { status: "On Leave" },
              {
                where: {
                  id: applicationData.staffId,
                },
              }
            );
          } else if (status === "Rejected") {
            await Staff.update(
              { status: "Active" },
              {
                where: {
                  id: applicationData.staffId,
                },
              }
            );
          }

          return applicationData;
        }
      } else {
        throw new Error("Leave application not found or not updated");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error updating application status and staff status");
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

      const leaveApplicationsData = leaveApplications.map((leaveApp) =>
        leaveApp.toJSON()
      );
      console.log(leaveApplicationsData);
      return leaveApplicationsData;
    } catch (error) {
      logger.log(error);
      throw new Error("Error fetching leave applications with staff details");
    }
  }
}
