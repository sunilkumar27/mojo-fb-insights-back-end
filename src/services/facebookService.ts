import axios from 'axios';
import createError from 'http-errors';

/**
 * Service to connect to Facebook API.
 */
interface FacebookUserData {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
    };
  };
}

interface FacebookPage {
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

interface PageInsights {
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

const FACEBOOK_API_VERSION = 'v22.0';
const FACEBOOK_BASE_URL = `https://graph.facebook.com/${FACEBOOK_API_VERSION}`;

export const verifyFacebookToken = async (accessToken: string): Promise<FacebookUserData> => {
  try {
    const response = await axios.get<FacebookUserData>(`${FACEBOOK_BASE_URL}/me`, {
      params: {
        access_token: accessToken,
        fields: 'id,name,email,picture',
      },
    });
    return response.data;
  } catch (error) {
    throw createError(401, 'Invalid Facebook token');
  }
};

export const getUserPages = async (accessToken: string): Promise<FacebookPage[]> => {
  try {
    const response = await axios.get<{ data: FacebookPage[] }>(`${FACEBOOK_BASE_URL}/me/accounts`, {

      params: {
        access_token: accessToken,
        fields: 'id,name,access_token,picture,category,fan_count',
      },
    });
    return response.data.data;
  } catch (error) {
    throw createError(500, 'Failed to fetch user pages');
  }
};

export const getPageInsights = async (
  pageId: string,
  userAccessToken: string,
  since: string,
  until: string
): Promise<PageInsights> => {
  try {
    // First get the page access token
    const pagesResponse = await axios.get(`${FACEBOOK_BASE_URL}/me/accounts`, {
      params: {
        access_token: userAccessToken,
        fields: 'id,access_token'
      }
    });

    const page = pagesResponse.data.data.find((p: any) => p.id === pageId);
    if (!page) {
      throw createError(404, 'Page not found');
    }

    const pageAccessToken = page.access_token;

    // Get basic page information
    const pageResponse = await axios.get(`${FACEBOOK_BASE_URL}/${pageId}`, {
      params: {
        access_token: pageAccessToken,
        fields: 'fan_count,engagement',
      },
    });

    // Get insights data
    const insightsResponse = await axios.get(`${FACEBOOK_BASE_URL}/${pageId}/insights`, {
      params: {
        access_token: pageAccessToken,
        metric: [
          'page_fan_adds',
          'page_impressions',
          'page_post_engagements',
          'page_actions_post_reactions_like_total',
          'page_actions_post_reactions_love_total',
          'page_impressions_unique',
          'page_impressions_paid'
        ].join(','),
        period: 'total_over_range',
        since,
        until,
      },
    });
    

    const data = insightsResponse.data.data || [];

    return {
      followers: pageResponse.data.fan_count || 0,
      engagement: extractMetricValue(data, 'page_post_engagements'),
      impressions: extractMetricValue(data, 'page_impressions'),
      reactions: extractMetricValue(data, 'page_actions_post_reactions_like_total'),
      engagementDetails: {
        totalEngagements: extractMetricValue(data, 'page_post_engagements'),
        postImpressions: extractMetricValue(data, 'page_impressions')
      },
      impressionDetails: {
        unique: extractMetricValue(data, 'page_impressions_unique'),
        paid: extractMetricValue(data, 'page_impressions_paid'),
        organic: extractMetricValue(data, 'page_impressions') - extractMetricValue(data, 'page_impressions_paid')
      },      
      reactionDetails: {
        like: extractMetricValue(data, 'page_actions_post_reactions_like_total'),
        love: extractMetricValue(data, 'page_actions_post_reactions_love_total')
      }
    };
  } catch (error) {
    console.error('Failed to fetch page insights:', error);
    if (axios.isAxiosError(error)) {
      const fbError = error.response?.data?.error;
      throw createError(error.response?.status || 500,
        fbError?.message || 'Failed to fetch page insights');
    }
    throw createError(500, 'Failed to fetch page insights');
  }
};

const extractMetricValue = (data: any[], metricName: string): number => {
  const metric = data.find(d => d.name === metricName);
  return metric?.values[0]?.value || 0;
};