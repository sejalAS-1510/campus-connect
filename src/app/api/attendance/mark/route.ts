import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["faculty", "admin"].includes(payload.role)) {
    return NextResponse.json({ error: "Only faculty and admins can mark attendance." }, { status: 403 });
  }

  const { sessionId, records } = (await req.json()) as {
    sessionId: string;
    records: { studentId: string; present: boolean }[];
  };
  if (!sessionId || !Array.isArray(records)) {
    return NextResponse.json({ error: "sessionId and records are required." }, { status: 400 });
  }

  await connectDB();

  const session = await Attendance.findOne({ _id: sessionId });
  if (!session) return NextResponse.json({ error: "Session not found." }, { status: 404 });

  const presentSet = new Set(
    records.filter((r) => r.present).map((r) => r.studentId)
  );
  session.records = session.records.map((r: { student: { toString(): string } }) => ({
    student: r.student,
    present: presentSet.has(r.student.toString()),
  })) as typeof session.records;

  await session.save();
  return NextResponse.json({ ok: true });
}
