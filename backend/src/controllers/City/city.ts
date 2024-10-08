import logger from "../../logger/logger.js";
import { CityService } from "../../services/CityService.js";
const service = new CityService();

export const getCityDetailController = async(_:any,{cityname}:any,context:any) => {
    try{
        const ownerId = context.ownerId;
        if(!ownerId){
            throw new Error("you are not authorized ");
        }
        if(!cityname){
            throw new Error("cityname required");
        }
        const response = await service.getCityDetail(cityname);
        return response;

    }catch(error){
        logger.log(error);
        throw new Error("error getting city detail");
    }
}