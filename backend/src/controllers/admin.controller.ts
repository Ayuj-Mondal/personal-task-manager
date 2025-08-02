import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Task from '../models/Task';
import { env } from '../config/env';

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123'; // Predefined credentials
const ADMIN_SECRET = env.ADMIN_SECRET;

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, env.ADMIN_SECRET, { expiresIn: '1h' });
    console.log("✅ Token issued:", token); 
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
};

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ email: { $ne: 'admin@example.com' } });
    const tasks = await Task.find({});

    const userTasks = users.map(user => ({
      user: {
        id: user._id,
        email: user.email
      },
      tasks: tasks.filter(task => task.user.toString() === user._id.toString())
    }));

    return res.json(userTasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

