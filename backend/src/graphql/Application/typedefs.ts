import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Staff {
    id: ID!
    name: String!
    email: String!
    role: String!
    contactNumber: String!
  }

  type LeaveApplication {
    id: ID!
    staffId: ID!
    leaveType: String!
    startDate: String!
    endDate: String!
    reason: String
    status: String!
    staff: Staff
  }
  type StaffApplication {
    id: ID!
    staffId: ID!
    leaveType: String!
    startDate: String!
    endDate: String!
    reason: String
    status: String!
  }

  type Query {
    getLeaveApplication: [StaffApplication]!
    getAllLeaveApplication: [LeaveApplication!]!
  }

  type Mutation {
    applyForLeave(
      leaveType: String!
      startDate: String!
      endDate: String!
      reason: String
    ): LeaveApplication!

    updateLeaveStatus(applicationId: ID!, status: String!): LeaveApplication!
  }
`;
