import mongoose, { Schema, models, model } from "mongoose";

export interface IAttendanceRecord {
  student: mongoose.Types.ObjectId;
  present: boolean;
}

export interface IAttendanceSession {
  _id: string;
  subject: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId;
  records: IAttendanceRecord[];
  createdAt: Date;
}

const AttendanceSchema = new Schema<IAttendanceSession>(
  {
    subject: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    records: [
      {
        student: { type: Schema.Types.ObjectId, ref: "User", required: true },
        present: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default models.Attendance || model<IAttendanceSession>("Attendance", AttendanceSchema);
