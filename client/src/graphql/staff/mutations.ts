import { gql } from '@apollo/client';
export const DELETE_STAFF = gql`
  mutation deleteStaff($staffId: ID!) {
    deleteStaff(staffId: $staffId)
  }
`;

export const UPLOAD_STAFF_IMAGE = gql`
  mutation uploadStaffImage($profileImage: Upload!) {
    uploadStaffImage(profileImage: $profileImage) {
      id
      name
      profileImage
    }
  }
`;

export const GIVE_FEEDBACK = gql`
  mutation giveFeedback($staffId: ID!, $rating: Int!, $comment: String) {
    giveFeedback(staffId: $staffId, rating: $rating, comment: $comment) {
      id
      rating
      comment
      userId
      staffId
      createdAt
    }
  }
`;
