import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Placement from "@/models/Placement";
import PlacementApplication from "@/models/PlacementApplication";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB();

  const placements = await Placement.find({}).populate("createdBy", "name").sort({ deadline: 1 });

  const applications = await PlacementApplication.find({ student: payload.userId });
  const appStatusMap = new Map(applications.map((app) => [app.placement.toString(), app.status]));

  const withStatus = await Promise.all(
    placements.map(async (p) => {
      const applicantCount = await PlacementApplication.countDocuments({ placement: p._id });
      return {
        ...p.toObject(),
        applicantCount,
        applicationStatus: appStatusMap.get(p._id.toString()) || null,
      };
    })
  );

  return NextResponse.json({ placements: withStatus });
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["coordinator", "admin"].includes(payload.role)) {
    return NextResponse.json(
      { error: "Only placement coordinators and admins can post job drives." },
      { status: 403 }
    );
  }

  const { company, role, eligibility, ctc, description, deadline } = await req.json();
  if (!company || !role || !eligibility || !ctc || !description || !deadline) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  await connectDB();
  const placement = await Placement.create({
    company,
    role,
    eligibility,
    ctc,
    description,
    deadline,
    createdBy: payload.userId,
  });

  return NextResponse.json({ placement });
}
