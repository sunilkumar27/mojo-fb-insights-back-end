import { Router } from 'express';
import { verifyFacebookToken } from '../services/facebookService';
import { AuthRequest } from '../middleware/auth';

const router = Router();

router.post('/verify', async (req: AuthRequest, res, next) => {
  try {
    const { accessToken } = req.body;
    
    if (!accessToken) {
      res.status(400).json({ error: 'Access token is required' });
      return;
    }

    const userData = await verifyFacebookToken(accessToken);
    res.json(userData);
  } catch (error) {
    next(error);
  }
});

export default router;