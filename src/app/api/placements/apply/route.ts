import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import PlacementApplication from "@/models/PlacementApplication";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "student") {
    return NextResponse.json({ error: "Only students can apply for placement drives." }, { status: 403 });
  }

  const { placementId, resumeUrl } = await req.json();
  if (!placementId) {
    return NextResponse.json({ error: "Placement ID is required." }, { status: 400 });
  }

  await connectDB();

  try {
    const application = await PlacementApplication.create({
      placement: placementId,
      student: payload.userId,
      resumeUrl: resumeUrl || "",
      status: "applied",
    });
    return NextResponse.json({ application });
  } catch {
    return NextResponse.json({ error: "You have already applied for this placement drive." }, { status: 400 });
  }
}
