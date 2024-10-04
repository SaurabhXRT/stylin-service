import { User } from '../../models/User/User.js';

export class UserMiddleware {
    static async isUser(req: any) {
        try {
            const user = await User.findByPk(req.userId);
            if (!user) {
                throw new Error("Unauthorized: User not found");
            }
            req.user = user;
        } catch (error) {
            console.error("Error verifying user:", error);
            throw new Error("Unauthorized: User verification failed");
        }
    }
}