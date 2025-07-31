import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);

export interface LoginResponse { token: string; }
