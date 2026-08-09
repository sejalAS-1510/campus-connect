import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import Placement from "@/models/Placement";
import Assignment from "@/models/Assignment";
import Attendance from "@/models/Attendance";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { message } = await req.json();
  if (!message) return NextResponse.json({ error: "Message is required." }, { status: 400 });

  await connectDB();

  const lower = message.toLowerCase();

  // 1. Greetings
  if (lower === "hi" || lower === "hello" || lower === "hey" || lower === "hi there") {
    return NextResponse.json({
      reply: `Hello ${payload.name.split(" ")[0]}! I'm your Smart Campus AI Assistant. Ask me about live campus events, active placement drives, your pending assignments, or attendance rules!`,
    });
  }

  // 2. Events Queries (Dynamic DB Search)
  if (lower.includes("event") || lower.includes("fest") || lower.includes("club") || lower.includes("workshop")) {
    const events = await Event.find({}).sort({ date: 1 });

    if (events.length === 0) {
      return NextResponse.json({
        reply: "There are currently no campus events posted in the system. Faculty or Coordinators can publish new events under Dashboard -> Events!",
      });
    }

    // Check if query mentions a month or number date (e.g. "19 july", "july", "today")
    const matching = events.filter((e) => {
      const d = new Date(e.date);
      const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toLowerCase();
      const titleLower = e.title.toLowerCase();
      return lower.split(" ").some((word) => word.length > 2 && (dateStr.includes(word) || titleLower.includes(word)));
    });

    const targetList = matching.length > 0 ? matching : events;

    const listStr = targetList
      .slice(0, 3)
      .map(
        (e, i) =>
          `${i + 1}. **${e.title}**\n   📍 Venue: ${e.venue}\n   📅 Date: ${new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}\n   🎟️ Total Seats: ${e.seats}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: matching.length > 0
        ? `Here are the matching event details:\n\n${listStr}\n\nYou can register and get your digital QR Pass under Dashboard -> Events!`
        : `Here are the upcoming campus events:\n\n${listStr}\n\nHead over to Dashboard -> Events to reserve your seat and download your QR Pass!`,
    });
  }

  // 3. Placement & Jobs Queries (Dynamic DB Search)
  if (lower.includes("placement") || lower.includes("job") || lower.includes("company") || lower.includes("ctc") || lower.includes("drive") || lower.includes("hiring")) {
    const placements = await Placement.find({}).sort({ deadline: 1 });

    if (placements.length === 0) {
      return NextResponse.json({
        reply: "There are no active placement drives posted right now. Placement Coordinators update job openings under Dashboard -> Placements.",
      });
    }

    const listStr = placements
      .slice(0, 3)
      .map(
        (p, i) =>
          `${i + 1}. **${p.company}** (${p.role})\n   💼 Package: **${p.ctc}**\n   🎓 Eligibility: ${p.eligibility}\n   ⏰ Deadline: ${new Date(p.deadline).toLocaleDateString()}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: `Here are the current placement drives on campus:\n\n${listStr}\n\nYou can submit your resume link under Dashboard -> Placements!`,
    });
  }

  // 4. Assignments Queries (Dynamic DB Search)
  if (lower.includes("assignment") || lower.includes("homework") || lower.includes("due") || lower.includes("submission")) {
    const assignments = await Assignment.find({}).sort({ deadline: 1 });

    if (assignments.length === 0) {
      return NextResponse.json({
        reply: "Great news! There are no pending assignments posted at the moment.",
      });
    }

    const listStr = assignments
      .slice(0, 3)
      .map(
        (a, i) =>
          `${i + 1}. **${a.title}** (${a.subject})\n   📝 ${a.description}\n   ⏰ Deadline: ${new Date(a.deadline).toLocaleDateString()}`
      )
      .join("\n\n");

    return NextResponse.json({
      reply: `Here are the posted academic assignments:\n\n${listStr}\n\nSubmit your solutions or repository links under Dashboard -> Assignments!`,
    });
  }

  // 5. Attendance & Criteria Queries
  if (lower.includes("attendance") || lower.includes("percentage") || lower.includes("absent") || lower.includes("criteria")) {
    if (payload.role === "student") {
      const sessions = await Attendance.find({});
      let total = 0;
      let present = 0;
      sessions.forEach((s) => {
        const rec = s.records.find((r: any) => r.student.toString() === payload.userId);
        if (rec) {
          total++;
          if (rec.present) present++;
        }
      });

      const pct = total > 0 ? Math.round((present / total) * 100) : 0;
      return NextResponse.json({
        reply: `📌 **Attendance Criteria**: Students must maintain at least 75% attendance in each subject for exam eligibility.\n\n📊 **Your Live Status**: You have attended ${present} of ${total} recorded classes (${pct}% attendance). Check detailed subject-wise breakdown under Dashboard -> Attendance!`,
      });
    }

    return NextResponse.json({
      reply: "📌 **Attendance Policy**: Minimum 75% attendance per subject is required for end-semester exams. Faculty can mark attendance per session under Dashboard -> Attendance.",
    });
  }

  // 6. Generic Smart Fallback
  return NextResponse.json({
    reply: `I can help you with real-time campus data! Try asking me:\n- *"Which campus events are scheduled for July?"*\n- *"What placement drives are open?"*\n- *"What are my pending assignments?"*\n- *"What is my current attendance percentage?"*`,
  });
}
