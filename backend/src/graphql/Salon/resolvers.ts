import {
  createsalonController,
  getsalonController,
  getSalonStaffController,
} from "../../controllers/Salon/salon.js";
import { createStaffController } from "../../controllers/Salon/staff.js";
const queries = {
  getSalons: (_: any, __: any, context: any) =>
    getsalonController(_, __, context),
  getSalonStaffs: (_: any, { salonId }: any) =>
    getSalonStaffController(_, { salonId }),
};
const mutations = {
  createSalon: (_: any, payload: any, context: any) =>
    createsalonController(_, payload, context),
  createStaff: (_: any, payload: any, context: any) =>
    createStaffController(_, payload, context),
};
export const resolvers = { mutations, queries };
