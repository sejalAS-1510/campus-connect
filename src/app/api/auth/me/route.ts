import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  await connectDB();
  const user = await User.findById(payload.userId).select("-password");
  if (!user) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      rollNumber: user.rollNumber,
      phone: user.phone,
      semester: user.semester,
      bio: user.bio,
      linkedIn: user.linkedIn,
      gitHub: user.gitHub,
      resumeUrl: user.resumeUrl,
    },
  });
}
