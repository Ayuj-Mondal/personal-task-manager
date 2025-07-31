import { Response } from "express";
import Task from "../models/Task";
import type { AuthedRequest } from "../middleware/auth";
import { z } from "zod";

// ---- Schemas ----
const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  deadline: z.string().datetime().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  completed: z.boolean().optional()
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  deadline: z.string().datetime().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(), // <- no default here
  completed: z.boolean().optional()
});

// ---- Controllers ----
export async function createTask(req: AuthedRequest, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const data = parsed.data;
  const task = await Task.create({
    ...data,
    deadline: data.deadline ? new Date(data.deadline) : undefined,
    user: req.userId
  });

  res.status(201).json(task);
}

export async function getTasks(req: AuthedRequest, res: Response) {
  const tasks = await Task.find({ user: req.userId }).sort({ completed: 1, priority: -1, deadline: 1 });
  res.json(tasks);
}

export async function updateTask(req: AuthedRequest, res: Response) {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const data = parsed.data;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { ...data, deadline: data.deadline ? new Date(data.deadline) : undefined },
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
}

export async function deleteTask(req: AuthedRequest, res: Response) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
}
