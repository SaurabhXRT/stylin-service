import {
  checkTodaysAttendanceController,
  createAttendenceTimingsController,
  recordAttendanceController,
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
};
export const resolvers = { mutations, queries };
