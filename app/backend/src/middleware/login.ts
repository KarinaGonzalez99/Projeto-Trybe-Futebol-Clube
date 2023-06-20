import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
import { tokenValidation } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: {
    email: string;
    role: string;
  };
}

const validateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = tokenValidation(token) as { email: string;
      role: string;
      iat: number;
      exp: number;
    };
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
