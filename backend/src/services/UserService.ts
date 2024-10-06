import logger from "../logger/logger.js";
import { User } from "../models/User/User.js";
import { Staff } from "../models/Staff/Staff.js";
import bcrypt from "bcrypt";

export class UserService {
    async userCreate(data: any){
        try {
            const user = await User.create({
                ...data
            });
            return user.toJSON(); 

        }catch(error){
            logger.log(error);
            throw new Error("error creating user")
        }
    }

    async getUserbyusername(username: string){
        try {
            const user = await User.findOne({
                where : {
                    username: username,
                }
            });
            return user ? user.toJSON() : null;
        }catch(error){
            logger.log(error);
            throw new Error("error while getting user with username");
        }
    }

    async getUserByemail(useremail: string){
        const user = await User.findOne({
            where: {
                email: useremail,
            }
        });
        return user? user.toJSON() : null;
    }

    async getUserByUsernameAndPassword(username: string, password: string) {
        try {
            const user = await User.findOne({
                where: {
                    username: username,
                }
            });
            logger.log("Retrieved user:", user.toJSON());
            if (!user) {
                return null;
            }
            logger.log("user password fom db",user.toJSON().name);
            const passwordMatches = await bcrypt.compare(password, user.toJSON().password);
            if (passwordMatches) {
                return user.toJSON();
            } else {
                return null;
            }
        } catch (error) {
            logger.log(error);
            throw new Error("Error while verifying user password");
        }
    }

    async getUserById(userId: any){
        try {
            const user = await User.findByPk(userId);
    
            if (!user) {
                throw new Error("User not found");
            }
    
            return user.toJSON();
        } catch (error) {
            logger.error("Error fetching user:", error);
            throw new Error("An error occurred while fetching the user");
        }
    }

    async getStaffById(staffId: any){
        try {
            const staff = await Staff.findByPk(staffId);
    
            if (!staff) {
                throw new Error("staff not found");
            }
    
            return staff.toJSON();
        } catch (error) {
            logger.error("Error fetching staff:", error);
            throw new Error("An error occurred while fetching the staff");
        }
    }

    async getStaffByEmailAndPassword(email:any,password:any){
        try{
            const staff = await Staff.findOne({
                where: {
                    email: email,
                }
            });
            if(!staff){
                return null;
            }
            const passwordMatches = await bcrypt.compare(password, staff.toJSON().password);
            if (passwordMatches) {
                return staff.toJSON();
            } else {
                return null;
            }
        }catch(error){
            logger.log(error);
            throw new Error("error logging in for staff")
        }
    }
}