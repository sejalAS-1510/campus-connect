import mongoose, { Schema, models, model } from "mongoose";

export interface ISubmission {
  _id: string;
  assignment: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  content: string; // text answer or a link (e.g. GitHub / Drive URL)
  submittedAt: Date;
  marks?: number;
  feedback?: string;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    assignment: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    marks: { type: Number },
    feedback: { type: String },
  },
  { timestamps: { createdAt: "submittedAt", updatedAt: true } }
);

SubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

export default models.Submission || model<ISubmission>("Submission", SubmissionSchema);
