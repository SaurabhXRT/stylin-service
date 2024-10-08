import {
  createsalonController,
  getownersalonController,
  getSalonStaffController,
  getAllSalonController,
} from "../../controllers/Salon/salon.js";
import { createStaffController } from "../../controllers/Salon/staff.js";
const queries = {
  getOwnerSalons: (_: any, __: any, context: any) =>
    getownersalonController(_, __, context),
  getSalonStaffs: (_: any, { salonId }: any) =>
    getSalonStaffController(_, { salonId }),
  getAllSalons: (_: any,__:any, context: any) => getAllSalonController(_,__, context),
};
const mutations = {
  createSalon: (_: any, payload: any, context: any) =>
    createsalonController(_, payload, context),
  createStaff: (_: any, payload: any, context: any) =>
    createStaffController(_, payload, context),
};
export const resolvers = { mutations, queries };
