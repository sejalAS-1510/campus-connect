import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "student") {
    return NextResponse.json({ error: "Only students can submit assignments." }, { status: 403 });
  }

  const { assignmentId, content } = await req.json();
  if (!assignmentId || !content) {
    return NextResponse.json({ error: "Content is required." }, { status: 400 });
  }

  await connectDB();

  try {
    const submission = await Submission.findOneAndUpdate(
      { assignment: assignmentId, student: payload.userId },
      { content, submittedAt: new Date() },
      { upsert: true, new: true }
    );
    return NextResponse.json({ submission });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not submit. Try again." }, { status: 500 });
  }
}
