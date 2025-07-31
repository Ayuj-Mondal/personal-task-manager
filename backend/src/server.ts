import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";


async function bootstrap() {
  await mongoose.connect(env.MONGODB_URI);
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get("/", (_req, res) => res.send("API OK"));
  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);


  app.listen(env.PORT, () => console.log(`API running at http://localhost:${env.PORT}`));
}

bootstrap().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
