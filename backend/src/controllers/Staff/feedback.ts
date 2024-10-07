import logger from "../../logger/logger.js";
import { FeedbackService } from "../../services/FeedbackService.js";
const service = new FeedbackService();

export const createFeedbackController = async(_: any, payload: any, context: any) => {
    try{
        const userId = context.userId;
        if(!userId){
            throw new Error("unauthorized to give feedback");
        }
        const feedbackdata = {
            rating: payload.rating,
            comment: payload.comment,
            userId: userId,
            staffId: payload.staffId
        }
        const response = await service.createFeedback(feedbackdata);
        return response;

    }catch(error){
        logger.log(error);
        throw new Error("error creating feedback");
    }
}

export const getStaffFeedbackcontroller = async(_:any,{staffId}: any,context:any) => {
    try{
        const ownerId = context.ownerId;
        if(!ownerId){
            throw new Error("you are not authorized to view feedbacks");
        }
        if(!staffId){
            throw new Error("staffif required");
        }
        const response = await service.getFeedback(staffId);
        return response;
    }catch(error){
        logger.log(error);
        throw new Error("error getting staff feedback");
    }
}