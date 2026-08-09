import mongoose, { Schema, models, model } from "mongoose";

export interface IPasswordReset {
  _id: string;
  email: string;
  otp: string;
  token: string;
  expiresAt: Date;
}

const PasswordResetSchema = new Schema<IPasswordReset>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    otp: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default models.PasswordReset || model<IPasswordReset>("PasswordReset", PasswordResetSchema);
