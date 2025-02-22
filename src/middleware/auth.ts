import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { verifyFacebookToken } from '../services/facebookService';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    accessToken: string;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createError(401, 'No authorization token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw createError(401, 'Invalid authorization header format');
    }

    // Verify Facebook access token
    const userData = await verifyFacebookToken(token);
    
    req.user = {
      id: userData.id,
      accessToken: token,
    };

    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};