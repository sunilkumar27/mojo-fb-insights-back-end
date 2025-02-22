import { Request, Response, NextFunction } from 'express';
import { parse, isValid, isBefore } from 'date-fns';

export const validateDateRange = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { since, until } = req.query;

  if (!since || !until) {
    return res.status(400).json({
      error: 'Both since and until dates are required',
    });
  }

  const sinceDate = parse(since as string, 'yyyy-MM-dd', new Date());
  const untilDate = parse(until as string, 'yyyy-MM-dd', new Date());

  if (!isValid(sinceDate) || !isValid(untilDate)) {
    return res.status(400).json({
      error: 'Invalid date format. Use YYYY-MM-DD',
    });
  }

  if (isBefore(untilDate, sinceDate)) {
    return res.status(400).json({
      error: 'Until date must be after since date',
    });
  }

  next();
};