import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "faculty";
  department?: string;
  rollNumber?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty"], required: true },
    department: { type: String, default: "" },
    rollNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
