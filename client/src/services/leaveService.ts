import { client } from "../apollo/client";
import {
  GET_LEAVE_APPLICATION,
  GET_ALL_LEAVE_APPLICATIONS,
} from "../graphql/Application/queries";
import {
  APPLY_FOR_LEAVE,
  UPDATE_LEAVE_STATUS,
} from "../graphql/Application/mutations";

interface LeaveInput {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

interface UpdateLeaveStatusInput {
  applicationId: string;
  status: string;
}

export const applyForLeave = async (input: LeaveInput) => {
  const response = await client.mutate({
    mutation: APPLY_FOR_LEAVE,
    variables: input,
  });
  return response.data.applyForLeave;
};

export const getLeaveApplications = async () => {
  const response = await client.query({
    query: GET_LEAVE_APPLICATION,
  });
  return response.data.getLeaveApplication;
};

export const getAllLeaveApplications = async () => {
  const response = await client.query({
    query: GET_ALL_LEAVE_APPLICATIONS,
  });
  return response.data.getAllLeaveApplication;
};

export const updateLeaveStatus = async (input: UpdateLeaveStatusInput) => {
  const response = await client.mutate({
    mutation: UPDATE_LEAVE_STATUS,
    variables: input,
  });
  return response.data.updateLeaveStatus;
};
