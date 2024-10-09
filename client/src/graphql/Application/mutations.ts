import { gql } from "@apollo/client";

export const APPLY_FOR_LEAVE = gql`
  mutation ApplyForLeave(
    $leaveType: String!
    $startDate: String!
    $endDate: String!
    $reason: String
  ) {
    applyForLeave(
      leaveType: $leaveType
      startDate: $startDate
      endDate: $endDate
      reason: $reason
    ) {
      id
      staffId
      leaveType
      startDate
      endDate
      reason
      status
    }
  }
`;

export const UPDATE_LEAVE_STATUS = gql`
  mutation UpdateLeaveStatus($applicationId: ID!, $status: String!) {
    updateLeaveStatus(applicationId: $applicationId, status: $status) {
      id
      staffId
      leaveType
      startDate
      endDate
      status
    }
  }
`;
