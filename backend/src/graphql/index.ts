import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
import { Salon } from "./Salon/index.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { gql } from "apollo-server-core";
import { Context } from "./types.js";
import { Query } from "pg";

const mergedTypes = mergeTypeDefs([
  User.typeDefs, 
  Salon.typeDefs
]);
async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer<Context>({
    typeDefs: [mergedTypes],
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Salon.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Salon.resolvers.mutations
      },
    },
    csrfPrevention: true,
    cache: "bounded",
    includeStacktraceInErrorResponses: false,
    introspection: true,
  });

  await gqlserver.start();
  return gqlserver;
}

export { createApolloGraphqlServer };
