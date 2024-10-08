import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type City {
    id: ID!
    cityname: String!
    latitude: Float!
    longitude: Float!
  }
  type Query {
    getCitydetail(cityname: String!): [City!]
  }
`;
