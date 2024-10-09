import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"; 
import { setContext } from "@apollo/client/link/context";
import { NormalizedCacheObject } from "@apollo/client";
import { store } from "../redux/store";

const uploadLink = createUploadLink({
  uri: "http://127.0.0.1:5000/graphql",
});


const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth.token;

  return {
    headers: {
      ...headers,
      authorization: token ? token: "",
    },
  };
});


export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});
