import logger from "../../logger/logger.js";
import { UserService } from "../../services/UserService.js";
const service = new UserService();
export const getCurrentUserController = async(__:any,_:any,context:any) => {
    try {
        let user = null;
        if (context.userId) {
          user = await service.getUserById(context.userId);
        } else if (context.ownerId) {
          user = await service.getUserById(context.ownerId);
        }
        if(!user){
            throw new Error("no user found");
        }
        return user;
    } catch(error){
        throw new Error("error fetching userprofile");
    }
   
}

