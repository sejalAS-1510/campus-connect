import mongoose, { Schema, models, model } from "mongoose";

export interface IAssignment {
  _id: string;
  title: string;
  description: string;
  subject: string;
  deadline: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    deadline: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Assignment || model<IAssignment>("Assignment", AssignmentSchema);
