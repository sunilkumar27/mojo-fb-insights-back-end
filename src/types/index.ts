import { Request } from 'express';
import { AuthRequest } from '../middleware/auth';

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

/*export interface PageOverview {
  id: string;
  name: string;
  fan_count: number;
  category: string;
  picture: {
    data: {
      url: string;
    };
  };
  engagement: {
    count: number;
    social_sentence: string;
  };
}

export interface InsightMetric {
  name: string;
  period: string;
  values: Array<{
    value: number;
    end_time: string;
  }>;
  title: string;
  description: string;
}

export interface ValidatedRequest extends AuthRequest {
  query: {
    since: string;
    until: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}*/