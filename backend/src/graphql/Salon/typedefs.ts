import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Salon {
    id: ID!
    name: String!
    placename: String!
    longitude: Float!
    latitude: Float!
    ownerId: ID!
  }
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

  type Query {
    getOwnerSalons: [Salon!]
    getSalonStaffs(salonId: ID!): [Staff!]
    getAllSalons: [Salon!]
  }

  type Mutation {
    createSalon(
      name: String!
      placename: String!
      longitude: Float!
      latitude: Float!
    ): Salon
    createStaff(
      name: String!
      email: String!
      contactNumber: String!
      address: String
      role: String!
      department: String
      jobTitle: String!
      expertise: String
      workHours: String
      shift: String
      profileImage: String
      status: String
    ): Staff
  }
`;
