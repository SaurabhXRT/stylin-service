import logger from "../../logger/logger.js";
import { SalonService } from "../../services/SalonService.js";
import { Staffservice } from "../../services/StaffService.js";
const salonstaffservice = new SalonService();
const staffservice = new Staffservice();

export const createStaffController = async (_: any, payload: any, context: any) => {
    try {
        const ownerId = context.ownerId;
        if(!ownerId){
            throw new Error("you are not authorized to create staff");
        }
        const staffData = {
            name: payload.name,
            email: payload.email,
            contactNumber: payload.contactNumber,
            address: payload.address,
            role: payload.role,
            department: payload.department,
            jobTitle: payload.jobTitle,
            expertise: payload.expertise,
            dateOfJoining: payload. dateOfJoining,
            workHours: payload.workHours,
            shift: payload.shift,
            salonId: payload.salonId, 
        };
       
        const response = await salonstaffservice.createStaff(staffData);
        return response;
    } catch (error) {
        logger.log(error);
        throw new Error("Error creating staff");
    }
};

export const getStaffProfileController = async(_any:any,{staffId}:any, context: any) => {
    try{
        if(!context){
            throw new Error("unauthorized");
        }
        if(!staffId){
            throw new Error("staffid is required");
        }
        console.log("staff id for viewing profile",staffId);
        const staff = await staffservice.getStaffProfile(staffId);
        console.log(staff);
        return staff;

    }catch(error){
        logger.log(error);
        throw new Error("error getting staff profile");
    }

}