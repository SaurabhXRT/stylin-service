import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($name: String!, $username: String!, $email: String!, $password: String!, $role: String!) {
    registerUser(name: $name, username: $username, email: $email, password: $password, role: $role) {
      token
      role
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      role
    }
  }
`;

export const LOGIN_STAFF = gql`
  mutation loginStaff($email: String!, $password: String!) {
    loginStaff(email: $email, password: $password) {
      token
      staffId
    }
  }
`;
