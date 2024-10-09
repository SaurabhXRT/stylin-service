import {
  applyForLeaveController,
  getLeaveApplicationController,
  updateLeaveApplicationController,
  getAllLeaveApplicationsWithStaffDetailsController,
} from "../../controllers/Application/leave.js";

const queries = {
  getLeaveApplication: (_: any, __: any, context: any) =>
    getLeaveApplicationController(_, __, context),
  getAllLeaveApplication: (_: any, __: any, context: any) =>
    getAllLeaveApplicationsWithStaffDetailsController(_, __, context),
};

const mutations = {
  applyForLeave: (_: any, payload: any, context: any) =>
    applyForLeaveController(_, payload, context),
  updateLeaveStatus: (_: any, payload: any, context: any) =>
    updateLeaveApplicationController(_, payload, context),
};


export const resolvers = { mutations, queries };