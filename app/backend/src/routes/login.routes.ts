import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcrypt';
import ModelsUsers from '../database/models/Users';
import { generateToken } from '../utils/jwt';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  try {
    const user = await ModelsUsers.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ email: user.email, role: user.role });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
