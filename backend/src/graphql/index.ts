import { ApolloServer } from "@apollo/server";
import { User } from "./User/index.js";
import { Salon } from "./Salon/index.js";
import { Staff } from "./Staff/index.js";
import { City } from "./City/index.js";
import { Application } from "./Application/index.js";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { Context } from "./types.js";
import { GraphQLUpload } from "graphql-upload-ts";

const mergedTypes = mergeTypeDefs([
  User.typeDefs, 
  Salon.typeDefs,
  Staff.typeDefs,
  City.typeDefs,
  Application.typeDefs
]);
async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer<Context>({
    typeDefs: [mergedTypes],
    resolvers: {
      Upload: GraphQLUpload,
      Query: {
        ...User.resolvers.queries,
        ...Salon.resolvers.queries,
        ...Staff.resolvers.queries,
        ...City.resolvers.queries,
        ...Application.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Salon.resolvers.mutations,
        ...Staff.resolvers.mutations,
        ...Application.resolvers.mutations
      },
    },
    csrfPrevention: false,
    cache: "bounded",
    includeStacktraceInErrorResponses: false,
    introspection: true,
  });

  await gqlserver.start();
  return gqlserver;
}

export { createApolloGraphqlServer };
