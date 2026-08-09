"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface EventItem {
  _id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  deadline: string;
  seats: number;
  speakers?: string;
  registeredCount: number;
  registeredTicket?: string | null;
  createdBy?: { name: string };
}

export default function EventsPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    deadline: "",
    seats: 50,
    speakers: "",
  });
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/events");
    const data = await res.json();
    if (data.events) setEvents(data.events);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userLoading) load();
  }, [userLoading, load]);

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Could not create event.");
      return;
    }
    toast.success("Event created successfully.");
    setForm({ title: "", description: "", venue: "", date: "", deadline: "", seats: 50, speakers: "" });
    load();
  }

  async function registerEvent(eventId: string) {
    const res = await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Could not register.");
      return;
    }
    toast.success(`Registered! Your Ticket Code: ${data.ticketCode}`);
    load();
  }

  const canManage = ["faculty", "coordinator", "admin"].includes(user?.role || "");

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">Campus Events & Clubs</h1>

        {canManage && (
          <form
            onSubmit={createEvent}
            className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 mb-8 space-y-3"
          >
            <h2 className="font-display text-lg">Post New Campus Event</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Event Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <input
                required
                placeholder="Venue / Auditorium"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
            </div>
            <textarea
              required
              placeholder="Event Description & Schedule"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-ink/50 dark:text-parchment/50">Event Date</label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-ink/50 dark:text-parchment/50">Registration Deadline</label>
                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-ink/50 dark:text-parchment/50">Total Seats</label>
                <input
                  type="number"
                  min={1}
                  value={form.seats}
                  onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) || 50 })}
                  className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
            </div>
            <button
              disabled={creating}
              className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {creating ? "Posting Event…" : "Publish Event"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 rounded-lg bg-ink/10 dark:bg-parchment/10" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-lg border border-dashed border-ink/20 dark:border-parchment/20 p-10 text-center text-sm text-ink/50 dark:text-parchment/50">
            No upcoming events posted yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {events.map((ev) => (
              <div key={ev._id} className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-display text-lg">{ev.title}</h3>
                    <span className="text-xs rounded-full bg-brass/10 text-brass px-2.5 py-1 font-medium">
                      {ev.registeredCount}/{ev.seats} Seats
                    </span>
                  </div>
                  <p className="text-xs text-ink/50 dark:text-parchment/50 mb-3">
                    📍 {ev.venue} · 📅 {new Date(ev.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-ink/70 dark:text-parchment/70 leading-relaxed mb-2">{ev.description}</p>
                </div>

                <div className="pt-2 border-t border-ink/10 dark:border-parchment/10 flex items-center justify-between">
                  {ev.registeredTicket ? (
                    <div className="text-xs text-moss font-semibold bg-moss/10 px-3 py-1.5 rounded-md">
                      🎟️ Ticket: {ev.registeredTicket}
                    </div>
                  ) : user?.role === "student" ? (
                    <button
                      onClick={() => registerEvent(ev._id)}
                      disabled={ev.registeredCount >= ev.seats}
                      className="rounded-full bg-brass text-parchment px-4 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                      {ev.registeredCount >= ev.seats ? "Fully Booked" : "Register & Get QR Pass"}
                    </button>
                  ) : (
                    <span className="text-xs text-ink/40 dark:text-parchment/40">
                      Organized by {ev.createdBy?.name || "Campus Desk"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
