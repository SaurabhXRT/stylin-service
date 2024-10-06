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

  type Query {
    getSalons(ownerId: ID!): Salon
  }

  type Mutation {
   createSalon(
   name: String!
    placename: String!
    longitude: Float!
    latitude: Float!
    ): Salon
  }
`;
 