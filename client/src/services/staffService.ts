import { client } from "../apollo/client";
import {
  GET_STAFF_PROFILE,
  GET_STAFF_FEEDBACK,
  GET_STAFF_CLIENT_SERVICE,
  GET_SALON_OF_STAFF,
  GET_STAFF_OWN_PROFILE,
} from "../graphql/staff/queries";
import {
  DELETE_STAFF,
  UPLOAD_STAFF_IMAGE,
  GIVE_FEEDBACK,
  RECORD_STAFF_SERVICE,
} from "../graphql/staff/mutations";

// interface UploadStaffImageInput {
//   profileImage: File;
// }

interface FeedbackInput {
  staffId: string;
  rating: number;
  comment: string;
}

export const getStaffProfile = async (staffId: string) => {
  const response = await client.query({
    query: GET_STAFF_PROFILE,
    variables: { staffId },
  });
  console.log(response.data.getStaffProfile);
  return response.data.getStaffProfile;
};

export const getMyself = async () => {
  const response = await client.query({
    query: GET_STAFF_OWN_PROFILE,
  });
  return response.data.getStaffOwnProfile;
};

export const getSalonOfStaff = async () => {
  const response = await client.query({
    query: GET_SALON_OF_STAFF,
  });
  return response.data.getSalonOfStaff;
};

export const getStaffClientService = async (
  staffId: string,
  period: string
) => {
  const response = await client.query({
    query: GET_STAFF_CLIENT_SERVICE,
    variables: { staffId, period },
  });
  return response.data.getStaffClientService;
};

export const getStaffFeedback = async (staffId: string) => {
  const response = await client.query({
    query: GET_STAFF_FEEDBACK,
    variables: { staffId },
  });
  return response.data.getStaffFeedback;
};

export const deleteStaff = async (staffId: string) => {
  const response = await client.mutate({
    mutation: DELETE_STAFF,
    variables: { staffId },
  });
  return response.data.deleteStaff;
};

export const recordStaffService = async (staffId: string) => {
  const response = await client.mutate({
    mutation: RECORD_STAFF_SERVICE,
    variables: { staffId },
  });
  return response.data.recordStaffService;
};

export const uploadStaffImage = async (input: File) => {
  console.log("file her is", input);
  const response = await client.mutate({
    mutation: UPLOAD_STAFF_IMAGE,
    variables: { profileImage: input },
  });
  return response.data.uploadStaffImage;
};

export const giveFeedback = async (input: FeedbackInput) => {
  const response = await client.mutate({
    mutation: GIVE_FEEDBACK,
    variables: input,
  });
  return response.data.giveFeedback;
};
