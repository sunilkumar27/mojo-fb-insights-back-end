import { config } from 'dotenv';

config();

export const DatabaseConfig = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    // Optional: Used for caching Facebook API responses
    cacheTTL: parseInt(process.env.CACHE_TTL || '3600') // 1 hour default
  },

  // If you decide to use a SQL database later
  postgres: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};