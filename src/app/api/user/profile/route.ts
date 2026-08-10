import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { name, phone, department, rollNumber, semester, bio, linkedIn, gitHub, resumeUrl } = await req.json();

  if (!name || name.trim().length === 0) {
    return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
  }

  // Validate Phone Number if provided
  if (phone && phone.trim().length > 0) {
    const phoneRegex = /^[0-9+\-\s()]{7,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return NextResponse.json({ error: "Please enter a valid phone number (7-15 digits)." }, { status: 400 });
    }
  }

  // Helper URL validator
  const isValidUrl = (urlStr: string) => {
    try {
      const u = new URL(urlStr);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Validate LinkedIn Link
  if (linkedIn && linkedIn.trim().length > 0 && !isValidUrl(linkedIn.trim())) {
    return NextResponse.json({ error: "Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)." }, { status: 400 });
  }

  // Validate GitHub Link
  if (gitHub && gitHub.trim().length > 0 && !isValidUrl(gitHub.trim())) {
    return NextResponse.json({ error: "Please enter a valid GitHub URL (e.g. https://github.com/username)." }, { status: 400 });
  }

  // Validate Resume Link
  if (resumeUrl && resumeUrl.trim().length > 0 && !isValidUrl(resumeUrl.trim())) {
    return NextResponse.json({ error: "Please enter a valid Resume URL starting with http:// or https://." }, { status: 400 });
  }

  await connectDB();

  await User.findByIdAndUpdate(payload.userId, {
    name: name.trim(),
    phone: phone ? phone.trim() : "",
    department: department ? department.trim() : "",
    rollNumber: rollNumber ? rollNumber.trim() : "",
    semester: semester ? semester.trim() : "",
    bio: bio ? bio.trim() : "",
    linkedIn: linkedIn ? linkedIn.trim() : "",
    gitHub: gitHub ? gitHub.trim() : "",
    resumeUrl: resumeUrl ? resumeUrl.trim() : "",
  });

  return NextResponse.json({ message: "Profile updated successfully." });
}
