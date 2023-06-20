import { Request, Response, Router } from 'express';
import Match from '../database/models/Matches';
import validateToken, { AuthenticatedRequest } from '../middleware/match';

const router = Router();
const internal = { message: 'Internal server error' };

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
    return res.status(500).json(internal);
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
    return res.status(500).json(internal);
  }
});

router.patch('/:id', validateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({
      message: 'Invalid request. Missing homeTeamGoals or awayTeamGoals' });
  }

  try {
    const match = await Match.findByPk(id);

    if (match) {
      match.homeTeamGoals = homeTeamGoals; match.awayTeamGoals = awayTeamGoals;
      await match.save();

      return res.status(200).json({ message: 'Match updated successfully' });
    }

    return res.status(404).json({ message: 'Match not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(internal);
  }
});

router.post('/', validateToken, async (req: AuthenticatedRequest, res: Response) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  try {
    if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'Invalid request. Missing required fields' });
    }
    const match = await Match.create({
      id: 0,
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return res.status(201).json(match);
  } catch (error) {
    console.error(error);
    return res.status(500).json(internal);
  }
});

export default router;
