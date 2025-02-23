# Facebook Page Insights API

Backend service for the Facebook Page Insights Dashboard, built with Node.js, Express, and TypeScript. This API handles Facebook authentication and retrieves page insights data through the Facebook Graph API.

## Features

- Facebook OAuth token verification
- Page insights data retrieval
- Date range based analytics
- CORS enabled for frontend integration
- Error handling and validation
- TypeScript type safety
- Environment-based configuration

## Tech Stack

- Node.js >=18.0.0
- Express.js
- TypeScript
- Axios for API requests
- date-fns for date manipulation
- Facebook Graph API integration

## Prerequisites

- Node.js >=18.0.0
- Facebook Developer Account
- Facebook App with necessary permissions
- Environment variables configuration

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunilkumar27/mojo-fb-insights-back-end.git
   cd facebook-insights-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will restart automatically when files change.

## Building for Production

```bash
npm run build
```

## API Endpoints

### Authentication
- `POST /auth/verify`
  - Verify Facebook access token
  - Body: `{ accessToken: string }`

### Page Insights
- `GET /insights/pages`
  - Get list of user's Facebook pages
  - Requires authentication

- `GET /insights/pages/:pageId`
  - Get insights for specific page
  - Query params: 
    - `since`: Start date (YYYY-MM-DD)
    - `until`: End date (YYYY-MM-DD)
  - Requires authentication

### Health Check
- `GET /`
  - API health check endpoint
  - Returns API status and version

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── database.ts
│   └── facebook.ts
├── controllers/      # Route controllers
│   ├── authController.ts
│   └── insightsController.ts
├── middleware/       # Express middleware
│   ├── auth.ts
│   ├── validation.ts
│   └── errorHandler.ts
├── routes/          # API routes
│   ├── auth.ts
│   └── insights.ts
├── services/        # Business logic
│   ├── facebookService.ts
│   └── insightsService.ts
├── types/           # TypeScript types
│   └── index.ts
├── utils/           # Utility functions
└── app.ts          # Application entry point
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error responses format:
```json
{
  "error": {
    "status": 400,
    "message": "Error description"
  }
}
```

## Deployment

### Render.com Deployment

1. Connect your GitHub repository
2. Configure environment variables
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`

### Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `CLIENT_URL`: Frontend application URL
- `FACEBOOK_APP_ID`: Facebook App ID
- `FACEBOOK_APP_SECRET`: Facebook App Secret

## Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run linting

## Security

- CORS configuration for frontend
- Request validation
- Token verification
- Error handling
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email sunilkumar27@gmail.com or open an issue in the GitHub repository.