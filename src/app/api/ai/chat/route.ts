import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import Placement from "@/models/Placement";
import Assignment from "@/models/Assignment";
import Attendance from "@/models/Attendance";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { message } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  await connectDB();

  const lower = message.trim().toLowerCase();

  // 1. Greetings
  if (
    lower === "hello" ||
    lower === "hi" ||
    lower === "hey" ||
    lower === "hi there" ||
    lower === "good morning" ||
    lower === "good afternoon"
  ) {
    return NextResponse.json({
      reply: `Hello ${payload.name.split(" ")[0]}! I'm your Smart Campus AI Assistant. You can ask me about campus events, active placement drives, pending assignments, attendance criteria, hostel rules, exam schedules, or library facilities!`,
    });
  }

  if (lower.includes("who are you") || lower.includes("what can you do") || lower.includes("your name")) {
    return NextResponse.json({
      reply: `**Smart Campus AI Assistant**: I am designed to assist students, faculty, coordinators, and admins with real-time campus data, academic guidance, event tickets, placement drives, attendance tracking, and general campus FAQs!`,
    });
  }

  if (lower.includes("thank") || lower.includes("thanks") || lower.includes("awesome") || lower.includes("great")) {
    return NextResponse.json({
      reply: "You're very welcome! Let me know if you need any more campus help or information.",
    });
  }

  // 2. User Profile & Account Info
  if (
    lower.includes("who am i") ||
    lower.includes("my profile") ||
    lower.includes("my role") ||
    lower.includes("my details")
  ) {
    const userDoc = await User.findById(payload.userId);
    if (userDoc) {
      return NextResponse.json({
        reply: `**Your Campus Profile**:\n- **Name**: ${userDoc.name}\n- **Email**: ${userDoc.email}\n- **Role**: ${userDoc.role.toUpperCase()}\n- **Department**: ${userDoc.department || "Not specified"}\n- **Roll Number**: ${userDoc.rollNumber || "N/A"}`,
      });
    }
  }

  // 3. Events & Clubs Queries (Dynamic DB Search + General Rules)
  if (
    lower.includes("event") ||
    lower.includes("fest") ||
    lower.includes("club") ||
    lower.includes("workshop") ||
    lower.includes("hackathon") ||
    lower.includes("ticket") ||
    lower.includes("pass")
  ) {
    const events = await Event.find({}).sort({ date: 1 });

    if (events.length === 0) {
      return NextResponse.json({
        reply: "There are currently no campus events posted in the system. Faculty or Coordinators can publish new events under **Dashboard -> Events**!",
      });
    }

    const matching = events.filter((e) => {
      const d = new Date(e.date);
      const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toLowerCase();
      const titleLower = e.title.toLowerCase();
      return lower
        .split(" ")
        .some((word: string) => word.length > 2 && (dateStr.includes(word) || titleLower.includes(word)));
    });

    const targetList = matching.length > 0 ? matching : events;

    const listStr = targetList
      .slice(0, 3)
      .map(
        (e, i) =>
          `${i + 1}. **${e.title}**\n   Venue: ${e.venue}\n   Date: ${new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}\n   Total Seats: ${e.seats}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: matching.length > 0
        ? `Found matching campus events:\n\n${listStr}\n\nYou can register and get your digital QR ticket pass under **Dashboard -> Events**!`
        : `Here are upcoming campus events:\n\n${listStr}\n\nYou can register under **Dashboard -> Events**!`,
    });
  }

  // 4. Placement & Job Drives Queries (Dynamic DB Search)
  if (
    lower.includes("placement") ||
    lower.includes("job") ||
    lower.includes("drive") ||
    lower.includes("company") ||
    lower.includes("ctc") ||
    lower.includes("package font") ||
    lower.includes("salary") ||
    lower.includes("resume")
  ) {
    const placements = await Placement.find({}).sort({ deadline: 1 });

    if (placements.length === 0) {
      return NextResponse.json({
        reply: "**Placement Criteria**: Students with minimum 6.0 CGPA and no active backlogs are eligible for campus placement drives.\n\nCurrently, no new job drives are open. Check **Dashboard -> Placements** regularly!",
      });
    }

    const listStr = placements
      .slice(0, 3)
      .map(
        (p, i) =>
          `${i + 1}. **${p.company}** (${p.role})\n   Package: **${p.ctc}**\n   Eligibility: ${p.eligibility}\n   Deadline: ${new Date(p.deadline).toLocaleDateString()}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: `**Placement Drives**:\n\n${listStr}\n\nYou can attach your resume link and apply directly under **Dashboard -> Placements**!`,
    });
  }

  // 5. Assignments & Homework Queries
  if (
    lower.includes("assignment") ||
    lower.includes("homework") ||
    lower.includes("submission") ||
    lower.includes("due") ||
    lower.includes("deadline") ||
    lower.includes("task")
  ) {
    const assignments = await Assignment.find({}).sort({ deadline: 1 });

    if (assignments.length === 0) {
      return NextResponse.json({
        reply: "No pending assignments in the system right now. Your faculty will post homework under **Dashboard -> Assignments**.",
      });
    }

    const listStr = assignments
      .slice(0, 3)
      .map(
        (a, i) =>
          `${i + 1}. **${a.title}** (${a.subject})\n   Description: ${a.description}\n   Deadline: ${new Date(a.deadline).toLocaleDateString()}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: `**Active Assignments**:\n\n${listStr}\n\nSubmit your solutions or GitHub repository links under **Dashboard -> Assignments**!`,
    });
  }

  // 6. Attendance Criteria & Queries
  if (
    lower.includes("attendance") ||
    lower.includes("absent") ||
    lower.includes("present") ||
    lower.includes("percentage") ||
    lower.includes("medical leave") ||
    lower.includes("75")
  ) {
    if (payload.role === "student") {
      const records = await Attendance.find({ "records.student": payload.userId });
      let total = 0;
      let present = 0;
      for (const s of records) {
        const r = s.records.find((rec: any) => rec.student.toString() === payload.userId);
        if (r) {
          total++;
          if (r.present) present++;
        }
      }
      const pct = total > 0 ? Math.round((present / total) * 100) : 100;
      return NextResponse.json({
        reply: `**Attendance Criteria**: Students must maintain at least 75% attendance in each subject for exam eligibility.\n\n**Your Live Status**: You have attended ${present} of ${total} recorded classes (${pct}% attendance). Check detailed subject breakdown under **Dashboard -> Attendance**!`,
      });
    }

    return NextResponse.json({
      reply: "**Attendance Policy**: Minimum 75% attendance per subject is required for end-semester exams. Faculty can mark attendance per session under **Dashboard -> Attendance**.",
    });
  }

  // 7. Exam Rules & Grading
  if (lower.includes("exam") || lower.includes("grade") || lower.includes("cgpa") || lower.includes("admit card") || lower.includes("test")) {
    return NextResponse.json({
      reply: `**Exams & Grading Policy**:\n- **10-Point Grading System**: A+ (10), A (9), B (8), C (7), D (6), F (Fail < 40%).\n- **Admit Cards**: Released 1 week before mid-semester / end-semester exams for students with >= 75% attendance.\n- **Re-evaluation**: Applications open within 7 days of result declaration via the Examination Office.`,
    });
  }

  // 8. Hostel & Mess Rules
  if (lower.includes("hostel") || lower.includes("mess") || lower.includes("curfew") || lower.includes("food") || lower.includes("room")) {
    return NextResponse.json({
      reply: `**Hostel & Mess Rules**:\n- **Curfew Time**: Entry closes strictly at 10:00 PM for all resident hostels.\n- **Mess Timings**: Breakfast (7:30 - 9:30 AM), Lunch (12:30 - 2:30 PM), Dinner (7:30 - 9:30 PM).\n- **Gate Pass**: Apply via Student Affairs Desk 24 hours prior for overnight leaves.`,
    });
  }

  // 9. Central Library Information
  if (lower.includes("library") || lower.includes("book") || lower.includes("journal") || lower.includes("reading room")) {
    return NextResponse.json({
      reply: `**Central Library Information**:\n- **Timings**: 8:00 AM - 10:00 PM (Monday to Saturday), 24/7 during Exam Weeks.\n- **Borrowing Limit**: Students can borrow up to 4 books for 14 days.\n- **E-Resources**: Access IEEE, Springer, and ScienceDirect journals on campus Wi-Fi.`,
    });
  }

  // 10. Wi-Fi & IT Helpdesk
  if (lower.includes("wifi") || lower.includes("internet") || lower.includes("password") || lower.includes("it help") || lower.includes("portal")) {
    return NextResponse.json({
      reply: `**Campus Wi-Fi & IT Support**:\n- **Network Name**: CampusConnect_Secure\n- **Login**: Use your official student/faculty email and password.\n- **IT Helpdesk**: For password resets or portal access issues, visit Room 204, IT Building or email ithelp@campusconnect.edu.`,
    });
  }

  // 11. Fees & Scholarships
  if (lower.includes("fee") || lower.includes("scholarship") || lower.includes("dues") || lower.includes("tuition") || lower.includes("payment")) {
    return NextResponse.json({
      reply: `**Fees & Financial Aid**:\n- **Semester Fee Due Date**: 10th of the starting month of each semester.\n- **Merit Scholarships**: Available for top 5% scorers (CGPA >= 9.0) covering up to 50% tuition waiver.\n- **Payment Portal**: Fees can be paid online via the Accounts Section under Student Portal.`,
    });
  }

  // 12. Medical & Emergency Helpline
  if (lower.includes("medical") || lower.includes("doctor") || lower.includes("hospital") || lower.includes("emergency") || lower.includes("health") || lower.includes("ambulance")) {
    return NextResponse.json({
      reply: `**Health Center & Emergency Helpline**:\n- **Location**: Health Center, Gate No. 2\n- **Doctor Hours**: 9:00 AM - 7:00 PM (Doctor on call 24/7)\n- **24/7 Campus Ambulance**: Call +91-9988776655 for immediate medical assistance.`,
    });
  }

  // 13. Campus Transport & Shuttle
  if (lower.includes("bus") || lower.includes("transport") || lower.includes("shuttle") || lower.includes("parking") || lower.includes("vehicle")) {
    return NextResponse.json({
      reply: `**Campus Transport & Shuttle**:\n- **City Bus Routes**: Buses operate daily at 7:30 AM and 8:15 AM from major city hubs.\n- **Internal Shuttle**: Free electric shuttles run between Main Gate, Academic Blocks, and Hostels every 15 minutes.\n- **Parking**: Student two-wheeler/four-wheeler parking passes available at Gate 1 Security.`,
    });
  }

  // 14. Admin Contacts
  if (lower.includes("contact") || lower.includes("phone") || lower.includes("email") || lower.includes("admin") || lower.includes("office") || lower.includes("dean")) {
    return NextResponse.json({
      reply: `**Campus Administration Contacts**:\n- **Student Affairs Desk**: admin@campusconnect.edu | Room 102, Main Block\n- **Examination Cell**: exams@campusconnect.edu | Room 108\n- **Placement Cell**: placements@campusconnect.edu | Room 301, T&P Building\n- **Helpline**: +91-11-23456789 (Mon - Sat, 9 AM - 5 PM)`,
    });
  }

  // Fallback assistant response
  return NextResponse.json({
    reply: `I'm here to help with campus information! You can ask me about:\n- **Upcoming Events & Dates**\n- **Active Placement Drives & CTC**\n- **Pending Assignments & Homework**\n- **Subject Attendance & 75% Criteria**\n- **Exams, Library, Hostel & IT Helpdesk**`,
  });
}
