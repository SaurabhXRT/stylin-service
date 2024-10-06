// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      staffId?: string;
      ownerId?: string;
      user?: any;   
      staff?: any;  
      owner?: any;  
    }
  }
}
