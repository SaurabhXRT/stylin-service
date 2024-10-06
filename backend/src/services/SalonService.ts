import logger from "../logger/logger.js";
import {Salon} from "../models/Salon/Salon.js";

export class SalonService {
    async createSalon(salondata: any){
        try{
            const salon = await Salon.create({
                ...salondata,
            });
            return salon.toJSON();
        }catch(error){
            logger.log(error);
            throw new Error("error creating salon");
        }
    }

    async getsalonbyOwnerId(ownerId: any){
        try{
            const salon = await Salon.findOne({
                where: {
                    ownerId: ownerId,
                }
            });
            return salon;
        }catch(error){
            logger.log(error);
            throw new Error("error getting salon");
        }
    }
}