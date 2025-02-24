import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getUserPages, getPageInsights } from '../services/facebookService';
import { validateDateRange } from '../middleware/validation';

/**
 * Router definitions for page insights
 */
const router = Router();

// Get user's Facebook pages
router.get('/pages', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const accessToken = req.user?.accessToken;
    if (!accessToken) {
      res.status(401).json({ error: 'Access token is required' });
      return;
    }

    const pages = await getUserPages(accessToken);
    res.json(pages);
  } catch (error) {
    next(error);
  }
});

// Get page insights
router.get('/pages/:pageId', 
  authMiddleware,
  validateDateRange,
  async (req: AuthRequest, res, next) => {
    try {
      const { pageId } = req.params;
      const { since, until } = req.query as { since: string; until: string };
      const accessToken = req.user?.accessToken;

      if (!accessToken) {
        res.status(401).json({ error: 'Access token is required' });
        return;
      }

      const insights = await getPageInsights(pageId, accessToken, since, until);
      res.json(insights);
    } catch (error) {
      next(error);
    }
  }
);

export default router;