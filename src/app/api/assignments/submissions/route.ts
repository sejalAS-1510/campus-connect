import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Submission from "@/models/Submission";
import Assignment from "@/models/Assignment";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "faculty") {
    return NextResponse.json({ error: "Only faculty can view submissions." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const assignmentId = searchParams.get("assignmentId");
  if (!assignmentId) {
    return NextResponse.json({ error: "Assignment ID is required." }, { status: 400 });
  }

  await connectDB();

  // Ensure this faculty owns the assignment
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const submissions = await Submission.find({ assignment: assignmentId })
    .populate("student", "name email rollNumber department")
    .sort({ submittedAt: -1 });

  return NextResponse.json({ submissions });
}
