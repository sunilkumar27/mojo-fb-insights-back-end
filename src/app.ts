import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import authRoutes from './routes/auth';
import insightsRoutes from './routes/insights';
import dataDeletionRoutes from './routes/data-deletion';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200}
));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Facebook Insights API is running',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api', dataDeletionRoutes);

// Error Handler
app.use(errorHandler);

// Start server based on environment
if (isDevelopment) {
  // Local development with HTTPS
  const https = require('https');
  const fs = require('fs');
  const path = require('path');

  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../certificates/localhost+2-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../certificates/localhost+2.pem'))
  };

  https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Development server running on https://localhost:${port}`);
  });
} else {
  // Production environment (render.com handles HTTPS)
  app.listen(port, () => {
    console.log(`Production server running on port ${port}`);
  });
}

export default app;