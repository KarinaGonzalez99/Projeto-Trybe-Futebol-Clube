import { Router } from 'express';
import getHomeLeaderboard from '../leaderboard/leaderboard';

const router = Router();

router.get('/home', getHomeLeaderboard);

export default router;
