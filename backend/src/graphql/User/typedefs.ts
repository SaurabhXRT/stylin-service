import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String!
  }

  type StaffAuthResponse {
    token: String!
    role: String!
  }

  type RegisterUserResponse {
    token: String!
    role: String!
  }

  type LoginUserResponse {
    token: String!
    role: String!
  }

  type Query {
    getMe: User
  }

  type Mutation {
    registerUser(
      name: String!
      username: String!
      email: String!
      password: String!
      role: String!
    ): RegisterUserResponse!

    loginUser(username: String!, password: String!): LoginUserResponse!

    loginStaff(email: String!, password: String!): StaffAuthResponse!
  }
`;
