import { gql } from "@apollo/client";

export const CREATE_ATTENDENCE_TIMINGS = gql`
  mutation createAttendenceTimings(
    $salonId: ID!
    $startTime: String!
    $endTime: String!
  ) {
    createAttendenceTimings(
      salonId: $salonId
      startTime: $startTime
      endTime: $endTime
    ) {
      id
      salonId
      startTime
      endTime
    }
  }
`;

export const RECORD_ATTENDENCE = gql`
  mutation recordAttendance(
    $location: LocationInput!
    $capturedImage: Upload!
  ) {
    recordAttendance(location: $location, capturedImage: $capturedImage) {
      success
      message
    }
  }
`;
