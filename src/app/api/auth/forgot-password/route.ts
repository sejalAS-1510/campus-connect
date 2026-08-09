import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "No account found with this email." }, { status: 404 });
    }

    // Generate 6-digit OTP code & Reset Token
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = `RESET-${Math.random().toString(36).substring(2)}${Date.now()}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    await PasswordReset.deleteMany({ email: email.toLowerCase() });
    await PasswordReset.create({
      email: email.toLowerCase(),
      otp,
      token,
      expiresAt,
    });

    return NextResponse.json({
      message: "Password reset OTP generated.",
      otp, // Provided in response for easy testing / demo
      token,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Could not generate reset code." }, { status: 500 });
  }
}
