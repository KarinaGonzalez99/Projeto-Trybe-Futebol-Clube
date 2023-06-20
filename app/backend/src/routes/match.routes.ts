import { Request, Response, Router } from 'express';
import Match from '../database/models/Matches';
import validateToken, { AuthenticatedRequest } from '../middleware/match';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;

    let matches;
    if (inProgress === 'true') {
      matches = await Match.findAll({ where: { inProgress: true }, include: [{ all: true }] });
    } else if (inProgress === 'false') {
      matches = await Match.findAll({ where: { inProgress: false }, include: [{ all: true }] });
    } else {
      matches = await Match.findAll({ include: [{ all: true }] });
    }

    return res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.patch('/:id/finish', validateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  // const { token } = req;

  try {
    const match = await Match.findByPk(id);

    if (match) {
      match.inProgress = false;
      await match.save();

      return res.status(200).json({ message: 'Finished' });
    }

    return res.status(404).json({ message: 'Match not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
