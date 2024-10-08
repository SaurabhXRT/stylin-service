import { gql } from "@apollo/client";
export const GET_STAFF_PROFILE = gql`
  query getStaffProfile($staffId: ID!) {
    getStaffProfile(staffId: $staffId) {
      id
      name
      email
      contactNumber
      jobTitle
      dateOfJoining
      address
      role
      expertise
      department
    }
  }
`;

export const GET_STAFF_OWN_PROFILE = gql`
  query getStaffOwnProfile {
    getStaffOwnProfile {
      id
      name
      email
      contactNumber
      jobTitle
      dateOfJoining
      address
      role
      expertise
      department
    }
  }
`;

export const GET_SALON_OF_STAFF = gql`
  query getSalonOfStaff {
    getSalonOfStaff {
      id
      name
      placename
      owner {
        id
        name
        email
      }
    }
  }
`;

export const GET_STAFF_FEEDBACK = gql`
  query getStaffFeedback($staffId: ID!) {
    getStaffFeedback(staffId: $staffId) {
      id
      rating
      comment
      userId
      staffId
      createdAt
    }
  }
`;

export const GET_STAFF_CLIENT_SERVICE = gql`
  query getStaffClientService($staffId: ID!, $period: String!) {
    getStaffClientService(staffId: $staffId, period: $period) {
      count
    }
  }
`;
