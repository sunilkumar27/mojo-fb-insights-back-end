/*import { Request, Response, NextFunction } from 'express';
import { verifyFacebookToken } from '../services/facebookService';
import { AuthRequest } from '../middleware/auth';
import createError from 'http-errors';
import { FacebookConfig } from '../config/facebook';

export class AuthController {
  static async verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.body;
      
      if (!accessToken) {
        throw createError(400, 'Access token is required');
      }

      const userData = await verifyFacebookToken(accessToken);
      
      res.json({
        success: true,
        data: userData
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAppCredentials(req: Request, res: Response) {
    // Only send public credentials
    res.json({
      appId: FacebookConfig.appId,
      apiVersion: FacebookConfig.apiVersion
    });
  }

  static async validateSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.body;
      
      if (!accessToken) {
        throw createError(400, 'Access token is required');
      }

      await verifyFacebookToken(accessToken);
      
      res.json({
        success: true,
        message: 'Session is valid'
      });
    } catch (error) {
      next(error);
    }
  }
}*/