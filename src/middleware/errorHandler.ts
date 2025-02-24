import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

/**
 * Error handler to handle the errors and send the response with proper status.
 */

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};