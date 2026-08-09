import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import EventRegistration from "@/models/EventRegistration";

export async function POST(req: NextRequest) {
  const payload = getTokenFromRequest(req);
  if (!payload || payload.role !== "student") {
    return NextResponse.json({ error: "Only students can register for events." }, { status: 403 });
  }

  const { eventId } = await req.json();
  if (!eventId) {
    return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
  }

  await connectDB();

  const event = await Event.findById(eventId);
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 });
  }

  const count = await EventRegistration.countDocuments({ event: eventId });
  if (count >= event.seats) {
    return NextResponse.json({ error: "Event is fully booked!" }, { status: 400 });
  }

  const ticketCode = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    const registration = await EventRegistration.create({
      event: eventId,
      student: payload.userId,
      ticketCode,
    });
    return NextResponse.json({ registration, ticketCode });
  } catch {
    return NextResponse.json({ error: "You are already registered for this event." }, { status: 400 });
  }
}
