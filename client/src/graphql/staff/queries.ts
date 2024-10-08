import { gql } from '@apollo/client';
export const GET_STAFF_PROFILE = gql`
  query getStaffProfile($staffId: ID!) {
    getStaffProfile(staffId: $staffId) {
      id
      name
      email
      contactNumber
      address
      role
      department
      jobTitle
      expertise
      dateOfJoining
      workHours
      shift
      profileImage
      status
      salonId
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
