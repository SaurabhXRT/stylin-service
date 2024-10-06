import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    getMe(id: ID!): User
  }
  type AuthResponse {
    token: String!
    userId: ID!
  }
  type StaffAuthResponse {
    token: String!
    staffId: ID!
  }
  type Mutation {
    registerUser(
      name: String!
      username: String!
      email: String!
      password: String!
      role: String!
    ): AuthResponse!
    loginUser(username: String!, password: String!): AuthResponse!
    loginStaff(email: String!, password: String!): StaffAuthResponse!
  }
`;
