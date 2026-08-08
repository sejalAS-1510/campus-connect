"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
  submissionCount?: number;
  submitted?: boolean;
}

export default function AssignmentsPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", subject: "", deadline: "" });
  const [creating, setCreating] = useState(false);
  const [openSubmit, setOpenSubmit] = useState<string | null>(null);
  const [submitText, setSubmitText] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/assignments");
    const data = await res.json();
    if (data.assignments) setAssignments(data.assignments);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userLoading) load();
  }, [userLoading, load]);

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Could not create assignment.");
      return;
    }
    toast.success("Assignment posted.");
    setForm({ title: "", description: "", subject: "", deadline: "" });
    load();
  }

  async function submitAssignment(assignmentId: string) {
    if (!submitText.trim()) {
      toast.error("Add a link or note before submitting.");
      return;
    }
    const res = await fetch("/api/assignments/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, content: submitText }),
    });
    if (!res.ok) {
      toast.error("Could not submit assignment.");
      return;
    }
    toast.success("Assignment submitted.");
    setOpenSubmit(null);
    setSubmitText("");
    load();
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">Assignments</h1>

        {user?.role === "faculty" && (
          <form
            onSubmit={createAssignment}
            className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 mb-8 space-y-3"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <input
                required
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
            </div>
            <textarea
              required
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="text-xs text-ink/50 dark:text-parchment/50">Deadline</label>
                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="block rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass mt-1"
                />
              </div>
              <button
                disabled={creating}
                className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {creating ? "Posting…" : "Post assignment"}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <SkeletonList />
        ) : assignments.length === 0 ? (
          <EmptyState
            text={
              user?.role === "faculty"
                ? "No assignments posted yet. Create one above."
                : "No assignments yet. Check back once your faculty posts one."
            }
          />
        ) : (
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li key={a._id} className="rounded-lg border border-ink/15 dark:border-parchment/15 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-ink/50 dark:text-parchment/50 mb-2">
                      {a.subject} · Due {new Date(a.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-ink/70 dark:text-parchment/70">{a.description}</p>
                  </div>
                  {user?.role === "faculty" ? (
                    <span className="text-xs rounded-full bg-ink/5 dark:bg-parchment/10 px-3 py-1 whitespace-nowrap">
                      {a.submissionCount ?? 0} submitted
                    </span>
                  ) : a.submitted ? (
                    <span className="text-xs rounded-full bg-moss/10 text-moss px-3 py-1 whitespace-nowrap">
                      Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => setOpenSubmit(openSubmit === a._id ? null : a._id)}
                      className="text-sm text-brass hover:underline whitespace-nowrap"
                    >
                      Submit
                    </button>
                  )}
                </div>

                {openSubmit === a._id && (
                  <div className="mt-4 border-t border-ink/10 dark:border-parchment/10 pt-4 space-y-2">
                    <textarea
                      value={submitText}
                      onChange={(e) => setSubmitText(e.target.value)}
                      placeholder="Paste a link (GitHub, Drive) or write your answer…"
                      rows={3}
                      className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => submitAssignment(a._id)}
                        className="rounded-full bg-brass text-parchment px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Submit assignment
                      </button>
                      <button
                        onClick={() => setOpenSubmit(null)}
                        className="rounded-full border border-ink/15 dark:border-parchment/20 px-4 py-2 text-sm hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 rounded-lg bg-ink/10 dark:bg-parchment/10" />
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
