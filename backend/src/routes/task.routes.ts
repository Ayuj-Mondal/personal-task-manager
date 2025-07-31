import { Router } from "express";
import { auth } from "../middleware/auth";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller";

const router = Router();
router.use(auth);
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
