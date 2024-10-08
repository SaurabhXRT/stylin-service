import { gql } from "apollo-server-express";
export const typeDefs = gql`
  scalar Upload
  type Staff {
    id: ID!
    name: String!
    email: String!
    contactNumber: String!
    address: String
    role: String!
    department: String
    jobTitle: String!
    expertise: String
    dateOfJoining: String!
    workHours: String
    shift: String
    profileImage: String
    status: String
    salonId: ID!
  }

  type Feedback {
    id: ID!
    rating: Int!
    comment: String
    userId: ID!
    staffId: ID!
    createdAt: String!
  }
  type Return {
    message: String!
  }
  type Owner {
    id: ID!
    name: String!
    email: String!
  }
  type Salon {
    id: ID!
    name: String!
    placename: String!
    longitude: Float!
    latitude: Float!
    owner: Owner!
  }
  type Query {
    getStaffProfile(staffId: ID!): Staff!
    getStaffFeedback(staffId: ID!): [Feedback!]
    getStaffClientService(staffId: ID!, period: String!): Int!
    getSalonOfStaff: Salon!
    getStaffOwnProfile: Staff!
  }
  type Mutation {
    deleteStaff(staffId: ID!): Boolean
    uploadStaffImage(profileImage: Upload!): Staff
    giveFeedback(staffId: ID!, rating: Int!, comment: String): Feedback!
    recordStaffService(staffId: ID!): Return!
  }
`;
