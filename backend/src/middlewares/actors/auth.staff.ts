import { Staff } from "../../models/Staff/Staff.js";

export class StaffMiddleware {
    static async isStaff(req: any) {
        try {
            const staff = await Staff.findByPk(req.staffId);
            if (!staff) {
                throw new Error("Unauthorized: staff not found");
            }
            req.staff = staff;
        } catch (error) {
            console.error("Error verifying staff:", error);
            throw new Error("Unauthorized: staff verification failed");
        }
    }
}