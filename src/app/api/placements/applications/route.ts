import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import PlacementApplication from "@/models/PlacementApplication";
import Placement from "@/models/Placement";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["coordinator", "admin"].includes(payload.role)) {
    return NextResponse.json({ error: "Only placement coordinators and admins can view job applicants." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const placementId = searchParams.get("placementId");
  if (!placementId) {
    return NextResponse.json({ error: "Placement ID is required." }, { status: 400 });
  }

  await connectDB();

  const placement = await Placement.findById(placementId);
  if (!placement) {
    return NextResponse.json({ error: "Placement drive not found." }, { status: 404 });
  }

  const applications = await PlacementApplication.find({ placement: placementId })
    .populate("student", "name email rollNumber department semester phone")
    .sort({ appliedAt: -1 });

  return NextResponse.json({ applications });
}
