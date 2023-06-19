import jwt = require('jsonwebtoken');
import { SignOptions } from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  role: string;
}

const key: string = process.env.JWT_SECRET || 'secret';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, key, jwtConfig);
  return token;
};

const tokenValidation = (token: string) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    return error;
  }
};

export {
  generateToken,
  tokenValidation,
};
