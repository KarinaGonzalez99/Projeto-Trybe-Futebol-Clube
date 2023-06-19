import { Request, Response, Router } from 'express';
import * as bcrypt from 'bcrypt';
import ModelsUsers from '../database/models/Users';
import { generateToken } from '../utils/jwt';

const router = Router();
const invalidEmailOrPassword = { message: 'Invalid email or password' };

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json(invalidEmailOrPassword);
  }

  try {
    const user = await ModelsUsers.findOne({ where: { email } });
    //     console.log(user?.dataValues.password);
    if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
      return res.status(401).json(invalidEmailOrPassword);
    }

    const token = generateToken({ email: user.email, role: user.role });
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
