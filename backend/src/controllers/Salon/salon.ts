import logger from "../../logger/logger.js";
import { SalonService } from "../../services/SalonService.js";
const salonservice = new SalonService();
export const createsalonController= async(_:any,payload:any,context:any) => {
    try{
        const salondata = {
            name: payload.name,
            placename: payload.placename,
            longitude: payload.longitude,
            latitude: payload.latitude,
            ownerId: context.ownerId
        }
        const response = await salonservice.createSalon(salondata);
        return response;

    }catch(error){
        logger.log(error);
        throw new Error("error creating salon");
    }
}

export const getsalonController = async(_:any,__:any,context:any) => {
    try{
        const ownerId = context.ownerId;
        const response = await salonservice.getsalonbyOwnerId(ownerId);
        return response;
    }catch(error){
        logger.log(error);
        throw new Error("error getting salon");
    }
}

export const getSalonStaffController = async(_:any,{ salonId }: any) => {
    try{
        if(!salonId){
            throw new Error("salonId is required");
        }
        const staffs = await salonservice.getSalonStaffs(salonId);
        return staffs;
    }catch(error){
        logger.log(error);
        throw new Error("error getting salon staff");
    }

}