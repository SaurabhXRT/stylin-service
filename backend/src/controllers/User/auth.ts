import logger from "../../logger/logger.js";
//import { GraphQLError } from 'graphql';
import { UserAuthService } from "../../services/AuthService.js";
const authservice = new UserAuthService();

export const registerUserController = async (_: any, payload: any) => {
  try {
    const userdata = {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };
    const email = payload.email;
    if (!(email.includes("@") && email.includes(".", email.indexOf("@")))) {
      //   throw new GraphQLError("Invalid Email!!", {
      //     extensions: {
      //       code: "INVALID_EMAIL",
      //     },
      //   });
      throw new Error("invalid email");
    }
    const response = await authservice.Usersignup(userdata);
    return response;
  } catch (error) {
    logger.log(error);
    //throw new GraphQLError("Error while registering User!!");
    if (error.message === "Username already exists") {
      throw new Error("Username already exists");
    } else if (error.message === "Email already exists") {
      throw new Error("Email already exists");
    } else {
      throw new Error("error registering user");
    }
  }
};

export const loginUserController = async (_: any, payload: any) => {
  try {
    const { username, password } = payload;
    console.log(payload);
    const response = await authservice.userLogin(username, password);
    return response;
  } catch (error) {
    logger.log(error);
    if (error.message === "invalid credentials") {
      throw new Error("Invalid username or password");
    } else {
      throw new Error("Error while logging in");
    }
  }
};

export const loginStaffController = async(_:any,payload:any) => {
  try{
    const {email,password} = payload;
    const response = await authservice.staffLogin(email,password);
    return response;
  }catch(error){
    logger.log(error);
    throw new Error("error in staff logging");
  }
}
