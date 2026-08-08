import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, department, rollNumber } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!["student", "faculty"].includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role,
      department,
      rollNumber,
    });

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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
