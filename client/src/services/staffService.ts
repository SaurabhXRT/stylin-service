import { client } from "../apollo/client";
import {
  GET_STAFF_PROFILE,
  GET_STAFF_FEEDBACK,
} from "../graphql/staff/queries";
import {
  DELETE_STAFF,
  UPLOAD_STAFF_IMAGE,
  GIVE_FEEDBACK,
} from "../graphql/staff/mutations";

interface UploadStaffImageInput {
  profileImage: File;
}

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
  return response.data.getStaffProfile;
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

export const uploadStaffImage = async (input: UploadStaffImageInput) => {
  const response = await client.mutate({
    mutation: UPLOAD_STAFF_IMAGE,
    variables: input,
    context: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
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
