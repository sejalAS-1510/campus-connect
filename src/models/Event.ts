import mongoose, { Schema, models, model } from "mongoose";

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: Date;
  deadline: Date;
  seats: number;
  speakers?: string;
  bannerUrl?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    deadline: { type: Date, required: true },
    seats: { type: Number, required: true, default: 50 },
    speakers: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Event || model<IEvent>("Event", EventSchema);
