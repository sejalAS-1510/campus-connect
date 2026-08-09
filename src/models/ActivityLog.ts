import mongoose, { Schema, models, model } from "mongoose";

export interface IActivityLog {
  _id: string;
  user: mongoose.Types.ObjectId;
  action: string;
  details?: string;
  ip?: string;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    details: { type: String, default: "" },
    ip: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.ActivityLog || model<IActivityLog>("ActivityLog", ActivityLogSchema);
