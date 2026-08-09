import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Assignment from "@/models/Assignment";
import Submission from "@/models/Submission";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB();

  if (payload.role === "faculty") {
    const assignments = await Assignment.find({ createdBy: payload.userId }).sort({
      createdAt: -1,
    });
    const withCounts = await Promise.all(
      assignments.map(async (a) => {
        const count = await Submission.countDocuments({ assignment: a._id });
        return { ...a.toObject(), submissionCount: count };
      })
    );
    return NextResponse.json({ assignments: withCounts });
  }

  // student: all assignments + whether they've submitted
  const assignments = await Assignment.find({})
    .populate("createdBy", "name department")
    .sort({ deadline: 1 });
  const mySubmissions = await Submission.find({ student: payload.userId });
  const submittedIds = new Set(mySubmissions.map((s) => s.assignment.toString()));

  const withStatus = assignments.map((a) => ({
    ...a.toObject(),
    submitted: submittedIds.has(a._id.toString()),
  }));

  return NextResponse.json({ assignments: withStatus });
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "faculty") {
    return NextResponse.json({ error: "Only faculty can create assignments." }, { status: 403 });
  }

  const { title, description, subject, deadline } = await req.json();
  if (!title || !description || !subject || !deadline) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  await connectDB();
  const assignment = await Assignment.create({
    title,
    description,
    subject,
    deadline,
    createdBy: payload.userId,
  });

  return NextResponse.json({ assignment });
}
