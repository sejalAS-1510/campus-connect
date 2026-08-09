import mongoose, { Schema, models, model } from "mongoose";

export interface IPlacementApplication {
  _id: string;
  placement: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  resumeUrl: string;
  status: "applied" | "shortlisted" | "interview" | "selected" | "rejected";
  appliedAt: Date;
}

const PlacementApplicationSchema = new Schema<IPlacementApplication>(
  {
    placement: { type: Schema.Types.ObjectId, ref: "Placement", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    resumeUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "interview", "selected", "rejected"],
      default: "applied",
    },
  },
  { timestamps: { createdAt: "appliedAt", updatedAt: true } }
);

PlacementApplicationSchema.index({ placement: 1, student: 1 }, { unique: true });

export default models.PlacementApplication ||
  model<IPlacementApplication>("PlacementApplication", PlacementApplicationSchema);
