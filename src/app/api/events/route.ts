import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";

export async function GET(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB();

  const events = await Event.find({}).populate("createdBy", "name").sort({ date: 1 });

  const registrations = await EventRegistration.find({ student: payload.userId });
  const registeredMap = new Map(registrations.map((r) => [r.event.toString(), r.ticketCode]));

  const withDetails = await Promise.all(
    events.map(async (ev) => {
      const count = await EventRegistration.countDocuments({ event: ev._id });
      return {
        ...ev.toObject(),
        registeredCount: count,
        registeredTicket: registeredMap.get(ev._id.toString()) || null,
      };
    })
  );

  return NextResponse.json({ events: withDetails });
}

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || !["coordinator", "admin"].includes(payload.role)) {
    return NextResponse.json(
      { error: "Only coordinators and admins can create events." },
      { status: 403 }
    );
  }

  const { title, description, venue, date, deadline, seats, speakers } = await req.json();
  if (!title || !description || !venue || !date || !deadline) {
    return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
  }

  await connectDB();
  const event = await Event.create({
    title,
    description,
    venue,
    date,
    deadline,
    seats: seats || 50,
    speakers: speakers || "",
    createdBy: payload.userId,
  });

  return NextResponse.json({ event });
}
