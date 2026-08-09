import mongoose, { Schema, models, model } from "mongoose";

export interface IEventRegistration {
  _id: string;
  event: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  ticketCode: string;
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ticketCode: { type: String, required: true },
  },
  { timestamps: true }
);

EventRegistrationSchema.index({ event: 1, student: 1 }, { unique: true });

export default models.EventRegistration ||
  model<IEventRegistration>("EventRegistration", EventRegistrationSchema);
