import {
  createsalonController,
  getsalonController,
} from "../../controllers/Salon/salon.js";
const queries = {
  getSalons: (_: any, __: any, context: any) =>
    getsalonController(_, __, context),
};
const mutations = {
  createSalon: (_: any, payload: any, context: any) =>
    createsalonController(_, payload, context),
};
export const resolvers = { mutations, queries };
