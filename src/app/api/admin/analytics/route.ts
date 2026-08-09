import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Attendance from "@/models/Attendance";
import Assignment from "@/models/Assignment";
import Submission from "@/models/Submission";
import Event from "@/models/Event";
import Placement from "@/models/Placement";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Only Admins can view analytics reports." }, { status: 403 });
  }

  await connectDB();

  const totalUsers = await User.countDocuments({});
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalCoordinators = await User.countDocuments({ role: "coordinator" });
  const totalAttendanceSessions = await Attendance.countDocuments({});
  const totalAssignments = await Assignment.countDocuments({});
  const totalSubmissions = await Submission.countDocuments({});
  const totalEvents = await Event.countDocuments({});
  const totalPlacements = await Placement.countDocuments({});

  return NextResponse.json({
    analytics: {
      totalUsers,
      totalStudents,
      totalFaculty,
      totalCoordinators,
      totalAttendanceSessions,
      totalAssignments,
      totalSubmissions,
      totalEvents,
      totalPlacements,
    },
  });
}
