import { Router } from 'express';
import Team from '../database/models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.findAll();

    const response = teams.map((team) => ({
      id: team.id,
      teamName: team.teamName,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os times' });
  }
});

export default router;
