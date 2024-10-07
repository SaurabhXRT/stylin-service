import logger from "../logger/logger.js";
import { Feedback } from "../models/UserFeedback/UserFeedback.js";
export class FeedbackService {
    async createFeedback(feedbackdata:any){
        try{
            const feedback = await Feedback.create({
                ...feedbackdata
            });
            return feedback.toJSON();

        }catch(error){
            logger.log(error);
            throw new Error("error creating feedback");
        }
    }

    async getFeedback(staffId:any){
        try{
            const stafffeedback = await Feedback.findAll({
                where: {
                    staffId: staffId
                }
            });
            return stafffeedback;

        }catch(error){
            logger.log(error);
            throw new Error("error getting feedback")
        }
    }

}