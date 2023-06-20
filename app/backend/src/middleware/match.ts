import { Request, Response, NextFunction } from 'express';
import { tokenValidation } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    role: string;
  };
  token?: string;
}

const validateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = tokenValidation(token) as { email: string; role:string };
    // console.log(decoded);
    req.token = token;
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
