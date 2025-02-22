import { config } from 'dotenv';

config();

export const FacebookConfig = {
  appId: process.env.FACEBOOK_APP_ID,
  appSecret: process.env.FACEBOOK_APP_SECRET,
  apiVersion: 'v22.0',
  graphUrl: 'https://graph.facebook.com',
};