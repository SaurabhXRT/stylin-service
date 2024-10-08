import { client } from '../apollo/client'; // Assuming Apollo Client is set up in apollo-client.ts
import { GET_ME } from '../graphql/user/queries';
import { REGISTER_USER, LOGIN_USER, LOGIN_STAFF } from '../graphql/user/mutations';

interface RegisterUserInput {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface StaffLoginInput {
  email: string;
  password: string;
}

export const getMe = async () => {
  const response = await client.query({
    query: GET_ME,
  });
  return response.data.getMe;
};

export const registerUser = async (input: RegisterUserInput) => {
  const response = await client.mutate({
    mutation: REGISTER_USER,
    variables: input,
  });
  return response.data.registerUser;
};

export const loginUser = async (input: LoginInput) => {
  const response = await client.mutate({
    mutation: LOGIN_USER,
    variables: input,
  });
  return response.data.loginUser;
};

export const loginStaff = async (input: StaffLoginInput) => {
  const response = await client.mutate({
    mutation: LOGIN_STAFF,
    variables: input,
  });
  return response.data.loginStaff;
};
