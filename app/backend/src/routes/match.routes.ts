import { Request, Response, Router } from 'express';
import Match from '../database/models/Matches';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const matches = await Match.findAll({ include: [{ all: true }] });
    return res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
