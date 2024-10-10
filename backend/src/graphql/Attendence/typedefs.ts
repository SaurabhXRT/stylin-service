import { gql } from "apollo-server-express";
export const typeDefs = gql`
scalar Upload
  type Attendance {
    id: ID!
    staffId: ID!
    checkInDate: String!
    checkInTime: String!
    status: String!
  }

  type AttendanceTimings {
    id: ID!
    salonId: ID!
    startTime: String!
    endTime: String!
  }

  type AttendanceCheckResponse {
    exists: Boolean!
  }

  input LocationInput {
    latitude: Float!
    longitude: Float!
  }

  type AttendanceResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    createAttendenceTimings(
      salonId: ID!
      startTime: String!
      endTime: String!
    ): AttendanceTimings!
    recordAttendance(
      location: LocationInput!
      capturedImage: Upload!
    ): AttendanceResponse!
  }

  type Query {
    checkTodaysAttendance: AttendanceCheckResponse!
  }
`;
