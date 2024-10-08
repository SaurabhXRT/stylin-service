import logger from ".././logger/logger.js";
import { CityDetail } from "../models/Cities/cities.js";
import { Op } from "sequelize";

export class CityService {
    async getCityDetail(cityname: string){
        try{
            const response = await CityDetail.findAll({
                where: {
                    cityname: {
                        [Op.iLike]: `${cityname}%`,
                    }
                }
            });
            const cityDetailsJSON = response.map(city => city.toJSON());
            console.log(cityDetailsJSON);
            return cityDetailsJSON;
        }catch(error){
            logger.log(error);
            throw new Error("error getting citydetail");
        }
    }
}