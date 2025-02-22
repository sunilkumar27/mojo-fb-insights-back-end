import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import authRoutes from './routes/auth';
import insightsRoutes from './routes/insights';
import dataDeletionRoutes from './routes/data-deletion';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api', dataDeletionRoutes);

// Error Handler
app.use(errorHandler);

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../certificates/localhost+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../certificates/localhost+2.pem'))
};

// Create HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

export default app;