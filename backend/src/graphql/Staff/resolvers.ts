// import {  graphqlUploadExpress,GraphQLUpload } from 'graphql-upload';
import { getStaffProfileController } from "../../controllers/Salon/staff.js";
import {
  deleteStaffController,
  uploadStaffImageController,
  recordStaffServiceController,
  getStaffClientServiceController,
  getSalonOfStaffController,
  getStaffOwnProfileController,
} from "../../controllers/Staff/staff.js";
import {
  createFeedbackController,
  getStaffFeedbackcontroller,
} from "../../controllers/Staff/feedback.js";

const queries = {
  getStaffProfile: (_: any, { staffId }: any, context: any) =>
    getStaffProfileController(_, { staffId }, context),
  getStaffFeedback: (_: any, { staffId }: any, context: any) =>
    getStaffFeedbackcontroller(_, { staffId }, context),
  getStaffClientService: (_: any, { staffId, period }: any, context: any) =>
    getStaffClientServiceController(_, { staffId, period }, context),
  getSalonOfStaff: (_: any, __: any, context: any) =>
    getSalonOfStaffController(_, __, context),
  getStaffOwnProfile: (_: any, __: any, context: any) =>
    getStaffOwnProfileController(_, __, context),
};
const mutations = {
  deleteStaff: (_: any, { staffId }: any, context: any) =>
    deleteStaffController(_, { staffId }, context),
  uploadStaffImage: (_: any, { profileImage }: any, context: any) =>
    uploadStaffImageController(_, { profileImage }, context),
  giveFeedback: (_: any, payload: any, context: any) =>
    createFeedbackController(_, payload, context),
  recordStaffService: (_: any, { staffId }: any, context: any) =>
    recordStaffServiceController(_, { staffId }, context),
};
export const resolvers = { mutations, queries };
