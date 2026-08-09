import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// GET: Admin fetches all users with analytics
export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Only Admins have access to User Management." }, { status: 403 });
  }

  await connectDB();

  const users = await User.find({}).select("-password").sort({ createdAt: -1 });

  return NextResponse.json({ users });
}

// PUT: Admin changes user role
export async function PUT(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Only Admins can change user roles." }, { status: 403 });
  }

  const { targetUserId, newRole } = await req.json();
  if (!targetUserId || !["student", "faculty", "coordinator", "admin"].includes(newRole)) {
    return NextResponse.json({ error: "Valid targetUserId and newRole are required." }, { status: 400 });
  }

  await connectDB();

  await User.findByIdAndUpdate(targetUserId, { role: newRole });

  return NextResponse.json({ message: "User role updated successfully." });
}

// DELETE: Admin deletes a user
export async function DELETE(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ error: "Only Admins can delete users." }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const targetUserId = searchParams.get("userId");
  if (!targetUserId) {
    return NextResponse.json({ error: "User ID is required." }, { status: 400 });
  }

  await connectDB();

  await User.findByIdAndDelete(targetUserId);

  return NextResponse.json({ message: "User deleted successfully." });
}
