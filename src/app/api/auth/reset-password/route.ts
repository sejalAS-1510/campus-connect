import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    await connectDB();

    const resetDoc = await PasswordReset.findOne({
      email: email.toLowerCase(),
      otp: otp.trim(),
    });

    if (!resetDoc) {
      return NextResponse.json({ error: "Invalid OTP code." }, { status: 400 });
    }

    if (new Date() > new Date(resetDoc.expiresAt)) {
      return NextResponse.json({ error: "OTP code has expired. Please request a new one." }, { status: 400 });
    }

    const hashed = await hashPassword(newPassword);
    await User.updateOne({ email: email.toLowerCase() }, { password: hashed });
    await PasswordReset.deleteMany({ email: email.toLowerCase() });

    return NextResponse.json({ message: "Password updated successfully. Please sign in." });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Could not reset password." }, { status: 500 });
  }
}
