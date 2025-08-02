import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.ADMIN_SECRET);

    // Safe assignment
    req.body = req.body || {};
    req.body.admin = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
