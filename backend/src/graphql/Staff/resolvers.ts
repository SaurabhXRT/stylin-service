// import {  graphqlUploadExpress,GraphQLUpload } from 'graphql-upload';
import { getStaffProfileController } from "../../controllers/Salon/staff.js";
import {
  deleteStaffController,
  uploadStaffImageController,
} from "../../controllers/Staff/staff.js";
import {
  createFeedbackController,
  getStaffFeedbackcontroller,
} from "../../controllers/Staff/feedback.js";
const queries = {
  getStaffProfile: (_: any, { staffId }: any) =>
    getStaffProfileController(_, { staffId }),
  getStaffFeedback: (_: any, { staffId }: any, context: any) =>
    getStaffFeedbackcontroller(_, { staffId }, context),
};
const mutations = {
  deleteStaff: (_: any, { staffId }: any, context: any) =>
    deleteStaffController(_, { staffId }, context),
  uploadStaffImage: (_: any, { profileImage }: any, context: any) =>
    uploadStaffImageController(_, { profileImage }, context),
  giveFeedback: (_: any, payload: any, context: any) =>
    createFeedbackController(_, payload, context),
};
export const resolvers = { mutations, queries };
