import { Schema, model, Types } from "mongoose";

export type Priority = "low" | "medium" | "high";

interface ITask {
  user: Types.ObjectId;
  title: string;
  description?: string;
  deadline?: Date;
  priority: Priority;
  completed: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    deadline: Date,
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model<ITask>("Task", taskSchema);

export interface Task {
  _id?: string; title: string; description?: string;
  deadline?: string; priority: Priority; completed: boolean;
  createdAt?: string; updatedAt?: string;
}

