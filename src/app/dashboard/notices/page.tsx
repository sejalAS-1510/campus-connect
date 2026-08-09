"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface NoticeItem {
  _id: string;
  title: string;
  content: string;
  category: "academic" | "placement" | "event" | "general";
  createdAt: string;
  createdBy?: { name: string; role: string };
}

export default function NoticesPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "general" as const,
  });
  const [publishing, setPublishing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/notices");
    const data = await res.json();
    if (data.notices) setNotices(data.notices);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userLoading) load();
  }, [userLoading, load]);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setPublishing(true);
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setPublishing(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Could not publish notice.");
      return;
    }
    toast.success("Announcement published.");
    setForm({ title: "", content: "", category: "general" });
    load();
  }

  const canPublish = ["faculty", "coordinator", "admin"].includes(user?.role || "");

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">Official Announcements & Notices</h1>

        {canPublish && (
          <form
            onSubmit={handlePublish}
            className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 mb-8 space-y-3 bg-ink/5 dark:bg-parchment/5"
          >
            <h2 className="font-display text-lg font-medium">Publish New Announcement</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <input
                required
                placeholder="Notice Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="sm:col-span-2 rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <select
                value={form.category}
                onChange={(e: any) => setForm({ ...form, category: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              >
                <option value="general" className="bg-parchment dark:bg-ink">General</option>
                <option value="academic" className="bg-parchment dark:bg-ink">Academic</option>
                <option value="placement" className="bg-parchment dark:bg-ink">Placement</option>
                <option value="event" className="bg-parchment dark:bg-ink">Event</option>
              </select>
            </div>
            <textarea
              required
              placeholder="Announcement Body Content..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <button
              disabled={publishing}
              className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {publishing ? "Publishing…" : "Publish Notice"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 rounded-lg bg-ink/10 dark:bg-parchment/10" />
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-lg border border-dashed border-ink/20 dark:border-parchment/20 p-10 text-center text-sm text-ink/50 dark:text-parchment/50">
            No official announcements posted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((n) => (
              <div key={n._id} className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2 bg-ink/5 dark:bg-parchment/5">
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-xl font-semibold">{n.title}</h3>
                  <span className="text-xs rounded-full bg-brass/10 text-brass px-3 py-1 font-medium capitalize">
                    {n.category}
                  </span>
                </div>
                <p className="text-sm text-ink/80 dark:text-parchment/80 leading-relaxed whitespace-pre-line">{n.content}</p>
                <div className="pt-2 text-xs text-ink/40 dark:text-parchment/40">
                  Published by {n.createdBy?.name || "Campus Desk"} ({n.createdBy?.role || "Staff"}) on {new Date(n.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
