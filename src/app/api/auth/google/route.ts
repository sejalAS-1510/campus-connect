import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, name, role } = await req.json();
    const userEmail = email || `google.user.${Date.now()}@campusconnect.edu`;
    const userName = name || "Google User";
    const userRole = role || "student";

    await connectDB();

    let user = await User.findOne({ email: userEmail.toLowerCase() });
    if (!user) {
      user = await User.create({
        name: userName,
        email: userEmail.toLowerCase(),
        password: "google_oauth_protected_account",
        role: userRole,
        isVerified: true,
      });
    }

    const token = signToken({ userId: user._id.toString(), role: user.role, name: user.name });

    const res = NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });

    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err: any) {
    console.error("Google Auth error:", err);
    return NextResponse.json({ error: "Google authentication failed." }, { status: 500 });
  }
}
