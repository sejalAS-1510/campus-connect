import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import User from "@/models/User";

// GET: faculty/admin -> sessions. student/coordinator -> sessions with their record + %.
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB();

  if (["faculty", "admin"].includes(payload.role)) {
    const query = payload.role === "admin" ? {} : { createdBy: payload.userId };
    const sessions = await Attendance.find(query)
      .sort({ date: -1 })
      .populate("records.student", "name rollNumber department");
    return NextResponse.json({ sessions });
  }

  // student / coordinator view
  const sessions = await Attendance.find({ "records.student": payload.userId }).sort({
    date: -1,
  });

  const bySubject: Record<string, { total: number; present: number }> = {};
  const history: { subject: string; date: Date; present: boolean }[] = [];

  for (const s of sessions) {
    const record = s.records.find(
      (r: { student: { toString(): string } }) => r.student.toString() === payload.userId
    );
    if (!record) continue;
    bySubject[s.subject] ||= { total: 0, present: 0 };
    bySubject[s.subject].total += 1;
    if (record.present) bySubject[s.subject].present += 1;
    history.push({ subject: s.subject, date: s.date, present: record.present });
  }

  return NextResponse.json({ bySubject, history });
}

// POST: faculty/admin creates a new attendance session for all students
export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["faculty", "admin"].includes(payload.role)) {
    return NextResponse.json({ error: "Only faculty and admins can create attendance sessions." }, { status: 403 });
  }

  const { subject, date } = await req.json();
  if (!subject || !date) {
    return NextResponse.json({ error: "Subject and date are required." }, { status: 400 });
  }

  await connectDB();

  const students = await User.find({ role: "student" }).select("_id");
  const session = await Attendance.create({
    subject,
    date,
    createdBy: payload.userId,
    records: students.map((s) => ({ student: s._id, present: false })),
  });

  return NextResponse.json({ session });
}
