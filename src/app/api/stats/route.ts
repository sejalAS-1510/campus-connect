import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Event from "@/models/Event";
import Placement from "@/models/Placement";

export async function GET() {
  try {
    await connectDB();

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalFaculty = await User.countDocuments({ role: "faculty" });
    const totalEvents = await Event.countDocuments({});
    const totalPlacements = await Placement.countDocuments({});

    return NextResponse.json({
      stats: {
        totalStudents,
        totalFaculty,
        totalEvents,
        totalPlacements,
        attendanceThreshold: "75%",
      },
    });
  } catch (err) {
    return NextResponse.json({
      stats: {
        totalStudents: 0,
        totalFaculty: 0,
        totalEvents: 0,
        totalPlacements: 0,
        attendanceThreshold: "75%",
      },
    });
  }
}
