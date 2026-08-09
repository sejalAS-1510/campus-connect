import mongoose, { Schema, models, model } from "mongoose";

export interface INotice {
  _id: string;
  title: string;
  content: string;
  category: "academic" | "placement" | "event" | "general";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["academic", "placement", "event", "general"],
      default: "general",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Notice || model<INotice>("Notice", NoticeSchema);
