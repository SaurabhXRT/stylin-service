import { Owner } from "../../models/Owner/Owner";

export class OwnerMiddleware {
    static async isOwner(req: any) {
        try {
            const owner = await Owner.findByPk(req.ownerId);
            if (!owner) {
                throw new Error("Unauthorized: owner not found");
            }
            req.owner = owner;
        } catch (error) {
            console.error("Error verifying owner:", error);
            throw new Error("Unauthorized: owner verification failed");
        }
    }
}