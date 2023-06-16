import { Router, Request, Response } from 'express';
import Team from '../database/models/Team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
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

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByPk(id);

    if (!team) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }

    res.status(200).json({
      id: team.id,
      teamName: team.teamName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o time' });
  }
});

export default router;
