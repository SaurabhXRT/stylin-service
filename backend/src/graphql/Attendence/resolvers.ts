import {
  checkTodaysAttendanceController,
  createAttendenceTimingsController,
  recordAttendanceController,
  getAttendenceRecordOfStaffController,
} from "../../controllers/Attendence/attendence.js";

const mutations = {
  createAttendenceTimings: (_: any, payload: any, context: any) =>
    createAttendenceTimingsController(_, payload, context),
  recordAttendance: (_: any, payload: any, context: any) =>
    recordAttendanceController(_, payload, context),
};
const queries = {
  checkTodaysAttendance: (_: any, __: any, context: any) =>
    checkTodaysAttendanceController(_, __, context),
  getStaffAttendenceRecord: (_: any, { staffId }: any, context: any) =>
    getAttendenceRecordOfStaffController(_, { staffId }, context),
};
export const resolvers = { mutations, queries };
