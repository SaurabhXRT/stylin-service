import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv-flow';
import { UserLoginSession } from '../models/LoginSession/User.Loginsession.js';
import { StaffLoginSession } from '../models/LoginSession/Staff.loginsession.js';
dotenv.config();

interface CustomJwtPayload extends JwtPayload {
    userId?: string;
    ownerId?: string;
    staffId?: string;
}

export class AuthMiddleware {
    static async verifyToken(req: any, res: any, next: any) {
        const token = req.headers.authorization;
        if (!token) {
            return "Unauthorized";
        }
        try {
            const isValid = await AuthMiddleware.validateToken(token);
            if (!isValid) {
                return "Invalid token";
            }

            const { userId,ownerId, staffId } = await AuthMiddleware.getActorIdFromToken(token);
            if (userId) {
                req.userId = userId;
            } else if(staffId) {
                req.staffId = staffId;
            } else if(ownerId){
                req.ownerId = ownerId;
            }
             else {
                throw new Error("Unauthorized");
            }
        } catch (error) {
            console.error("Token verification error:", error);
        }
    }

    static async validateToken(token: string) {
        try {
            const secret: string = process.env.JWT_SECRET!;
            jwt.verify(token, secret);
            return true;
        } catch (error) {
            console.error("Token validation error:", error);
            return false;
        }
    }

    static async getActorIdFromToken(token: string) {
        try {
            const secret: string = process.env.JWT_SECRET!;
            const decoded = jwt.verify(token, secret) as CustomJwtPayload;
            console.log(decoded);

            let loginSession: UserLoginSession | StaffLoginSession;
            if (decoded.userId) {
                loginSession = await UserLoginSession.findOne({
                    where: {
                        userId: decoded.userId,
                        token: token,
                    }
                });
                if (loginSession) {
                    return { 
                        userId: decoded.userId 
                    };
                }
            } else if (decoded.ownerId){
                loginSession = await UserLoginSession.findOne({
                    where: {
                        userId: decoded.ownerId,
                        token: token,
                    }
                });
                if (loginSession) {
                    return { 
                        ownerId: decoded.ownerId 
                    };
                }
            } else if (decoded.staffId){
                loginSession = await StaffLoginSession.findOne({
                    where: {
                        staffId: decoded.staffId,
                        token: token
                    }
                });
                if(loginSession){
                    return {
                        staffId: decoded.staffId
                    }
                }
            }

            console.log('Login session not found');
            return {};
        } catch (error) {
            console.error("Get ID from token error:", error);
            return {};
        }
    }
}