import mongoose, { Schema, models, model } from "mongoose";

export interface IPlacement {
  _id: string;
  company: string;
  role: string;
  eligibility: string;
  ctc: string;
  description: string;
  deadline: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PlacementSchema = new Schema<IPlacement>(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    eligibility: { type: String, required: true },
    ctc: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Placement || model<IPlacement>("Placement", PlacementSchema);
