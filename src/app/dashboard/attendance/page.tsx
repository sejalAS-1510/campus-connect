"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface StudentRef {
  _id: string;
  name: string;
  rollNumber?: string;
}
interface Session {
  _id: string;
  subject: string;
  date: string;
  records: { student: StudentRef; present: boolean }[];
}

export default function AttendancePage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bySubject, setBySubject] = useState<Record<string, { total: number; present: number }>>({});
  const [loading, setLoading] = useState(true);
  const [openSession, setOpenSession] = useState<string | null>(null);
  const [draftPresence, setDraftPresence] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ subject: "", date: "" });
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/attendance");
    const data = await res.json();
    if (data.sessions) setSessions(data.sessions);
    if (data.bySubject) setBySubject(data.bySubject);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userLoading) load();
  }, [userLoading, load]);

  async function createSession(e: React.FormEvent) {
    e.preventDefault();
    if (!form.subject || !form.date) return;
    setCreating(true);
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Could not create session.");
      return;
    }
    toast.success("Attendance session created.");
    setForm({ subject: "", date: "" });
    load();
  }

  function openMarking(session: Session) {
    setOpenSession(session._id);
    const initial: Record<string, boolean> = {};
    session.records.forEach((r) => (initial[r.student._id] = r.present));
    setDraftPresence(initial);
  }

  async function saveMarking(sessionId: string) {
    const records = Object.entries(draftPresence).map(([studentId, present]) => ({
      studentId,
      present,
    }));
    const res = await fetch("/api/attendance/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, records }),
    });
    if (!res.ok) {
      toast.error("Could not save attendance.");
      return;
    }
    toast.success("Attendance saved.");
    setOpenSession(null);
    load();
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">Attendance</h1>

        {["faculty", "admin"].includes(user?.role || "") && (
          <>
            <form
              onSubmit={createSession}
              className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 mb-8 flex flex-wrap gap-3 items-end"
            >
              <div className="flex-1 min-w-[160px]">
                <label className="text-xs text-ink/50 dark:text-parchment/50">Subject</label>
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Data Structures"
                  className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-ink/50 dark:text-parchment/50">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
              <button
                disabled={creating}
                className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {creating ? "Creating…" : "New session"}
              </button>
            </form>

            {loading ? (
              <SkeletonList />
            ) : sessions.length === 0 ? (
              <EmptyState text="No attendance sessions yet. Create one above to get started." />
            ) : (
              <ul className="space-y-3">
                {sessions.map((s) => {
                  const presentCount = s.records.filter((r) => r.present).length;
                  return (
                    <li key={s._id} className="rounded-lg border border-ink/15 dark:border-parchment/15 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{s.subject}</p>
                          <p className="text-xs text-ink/50 dark:text-parchment/50">
                            {new Date(s.date).toLocaleDateString()} · {presentCount}/{s.records.length} present
                          </p>
                        </div>
                        <button
                          onClick={() => openMarking(s)}
                          className="text-sm text-brass hover:underline"
                        >
                          Mark
                        </button>
                      </div>

                      {openSession === s._id && (
                        <div className="mt-4 border-t border-ink/10 dark:border-parchment/10 pt-4">
                          <ul className="space-y-2 max-h-64 overflow-y-auto">
                            {s.records.map((r) => (
                              <li key={r.student?._id || Math.random().toString()} className="flex items-center justify-between text-sm">
                                <span>
                                  {r.student?.name || "Student"}
                                  {r.student?.rollNumber && (
                                    <span className="text-ink/40 dark:text-parchment/40">
                                      {" "}
                                      · {r.student.rollNumber}
                                    </span>
                                  )}
                                </span>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={!!(r.student?._id && draftPresence[r.student._id])}
                                    onChange={(e) =>
                                      r.student?._id && setDraftPresence({
                                        ...draftPresence,
                                        [r.student._id]: e.target.checked,
                                      })
                                    }
                                  />
                                  Present
                                </label>
                              </li>
                            ))}
                          </ul>
                          <div className="flex gap-2 mt-4">
                            <button
                              onClick={() => saveMarking(s._id)}
                              className="rounded-full bg-brass text-parchment px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                            >
                              Save attendance
                            </button>
                            <button
                              onClick={() => setOpenSession(null)}
                              className="rounded-full border border-ink/15 dark:border-parchment/20 px-4 py-2 text-sm hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        {user?.role === "student" &&
          (loading ? (
            <SkeletonList />
          ) : Object.keys(bySubject).length === 0 ? (
            <EmptyState text="No attendance recorded yet. Check back once your faculty starts marking sessions." />
          ) : (
            <ul className="space-y-3">
              {Object.entries(bySubject).map(([subject, stat]) => {
                const pct = Math.round((stat.present / stat.total) * 100);
                return (
                  <li key={subject} className="rounded-lg border border-ink/15 dark:border-parchment/15 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{subject}</span>
                      <span
                        className={`text-sm font-medium ${
                          pct >= 75 ? "text-moss" : "text-rust"
                        }`}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink/10 dark:bg-parchment/10 overflow-hidden">
                      <div
                        className={`h-full ${pct >= 75 ? "bg-moss" : "bg-rust"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-ink/50 dark:text-parchment/50 mt-1">
                      {stat.present} of {stat.total} classes attended
                    </p>
                  </li>
                );
              })}
            </ul>
          ))}
      </div>
    </main>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 rounded-lg bg-ink/10 dark:bg-parchment/10" />
      ))}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-dashed border-ink/20 dark:border-parchment/20 p-10 text-center text-sm text-ink/50 dark:text-parchment/50">
      {text}
    </div>
  );
}
