import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Notice from "@/models/Notice";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB();

  const notices = await Notice.find({}).populate("createdBy", "name role").sort({ createdAt: -1 });

  return NextResponse.json({ notices });
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["faculty", "coordinator", "admin"].includes(payload.role)) {
    return NextResponse.json({ error: "Students cannot create notices." }, { status: 403 });
  }

  const { title, content, category } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required." }, { status: 400 });
  }

  await connectDB();

  const notice = await Notice.create({
    title,
    content,
    category: category || "general",
    createdBy: payload.userId,
  });

  return NextResponse.json({ notice });
}
