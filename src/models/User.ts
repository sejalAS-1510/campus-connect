import mongoose, { Schema, models, model } from "mongoose";

export type UserRole = "student" | "faculty" | "coordinator" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  rollNumber?: string;
  phone?: string;
  semester?: string;
  skills?: string[];
  linkedIn?: string;
  gitHub?: string;
  bio?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "coordinator", "admin"],
      default: "student",
      required: true,
    },
    department: { type: String, default: "" },
    rollNumber: { type: String, default: "" },
    phone: { type: String, default: "" },
    semester: { type: String, default: "" },
    skills: [{ type: String }],
    linkedIn: { type: String, default: "" },
    gitHub: { type: String, default: "" },
    bio: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
