import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

// This extends Express's Request type so TypeScript knows 'req.userId' is allowed
export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Splits "Bearer TOKEN_STRING"

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    console.log("AuthMiddleware.ts line 20");
    // Attach the secure userId directly to the request object
    req.userId = decoded.id;
    
    next(); // Pass control to the next function (your Gacha Controller)
  } catch (error) {
    
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const verifyResetToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Splits "Bearer TOKEN_STRING"

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET as string) as { userId: string, currentHash: string };
    const user = await User.findById(decoded.userId);
    
    if(!user){
      return res.status(404).json({ message: "User not found"});
    }

    if (user.password !== decoded.currentHash) {
      return res.status(401).json({ message: "This token has already been used." });
    }

    // Attach the secure userId directly to the request object
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};