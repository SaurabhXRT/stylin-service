import { gql } from '@apollo/client';
export const GET_ME = gql`
  query getMe($id: ID!) {
    getMe(id: $id) {
      id
      name
      username
      email
      role
    }
  }
`;
