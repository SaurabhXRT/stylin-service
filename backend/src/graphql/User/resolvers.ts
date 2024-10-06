import {
  registerUserController,
  loginUserController,
  loginStaffController,
} from "../../controllers/User/auth.js";
import { getCurrentUserController } from "../../controllers/User/profile.js";

const queries = {
  getMe: (_: any, __: any, context: any) =>
    getCurrentUserController(_, __, context),
};
const mutations = {
  registerUser: (_: any, payload: any) => registerUserController(_, payload),
  loginUser: (_: any, payload: any) => loginUserController(_, payload),
  loginStaff: (_: any, payload: any) => loginStaffController(_, payload),
};
export const resolvers = { mutations, queries };
