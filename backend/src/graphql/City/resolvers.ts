import { getCityDetailController } from "../../controllers/City/city.js";
const queries = {
  getCitydetail: (_: any, { cityname }: any, context: any) =>
    getCityDetailController(_, { cityname }, context),
};
export const resolvers = { queries };
