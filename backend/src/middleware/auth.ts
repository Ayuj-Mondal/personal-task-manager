import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthedRequest extends Request {
  userId?: string;
}

export function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token" });
  }

  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string };
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
