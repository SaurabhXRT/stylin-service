import { gql } from "@apollo/client";

export const GET_LEAVE_APPLICATION = gql`
  query GetLeaveApplication {
    getLeaveApplication {
      id
      leaveType
      startDate
      endDate
      reason
      status
    }
  }
`;

export const GET_ALL_LEAVE_APPLICATIONS = gql`
  query GetAllLeaveApplication {
    getAllLeaveApplication {
      id
      leaveType
      startDate
      endDate
      reason
      status
      staff {
        id
        name
        email
        role
        contactNumber
      }
    }
  }
`;
