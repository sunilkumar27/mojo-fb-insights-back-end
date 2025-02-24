import { Request } from 'express';
import { AuthRequest } from '../middleware/auth';

/**
 * Defines the types for facebook page and page insights responses
 */
export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  picture?: {
    data: {
      url: string;
    };
  };
  category?: string;
  fan_count?: number;
}

export interface PageInsights {
  followers: number;
  engagement: number;
  impressions: number;
  reactions: number;
  engagementDetails: {
    totalEngagements: number;
    postImpressions: number;
  };
  impressionDetails: {
    unique: number;
    paid: number;
    organic: number;
  };
  reactionDetails: {
    like: number;
    love: number;
  };
}