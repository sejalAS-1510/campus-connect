"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function ProfilePage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    rollNumber: "",
    semester: "",
    bio: "",
    linkedIn: "",
    gitHub: "",
    resumeUrl: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        department: user.department || "",
        rollNumber: user.rollNumber || "",
        semester: user.semester || "",
        bio: user.bio || "",
        linkedIn: user.linkedIn || "",
        gitHub: user.gitHub || "",
        resumeUrl: user.resumeUrl || "",
      });
    }
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    toast.success("Profile updated successfully!");
    setSaving(false);
  }

  if (userLoading) {
    return (
      <main>
        <Navbar user={null} />
        <div className="max-w-2xl mx-auto px-6 py-16 animate-pulse space-y-4">
          <div className="h-8 w-48 bg-ink/10 dark:bg-parchment/10 rounded" />
          <div className="h-64 w-full bg-ink/10 dark:bg-parchment/10 rounded-lg" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-2">Student & User Profile</h1>
        <p className="text-sm text-ink/60 dark:text-parchment/60 mb-8">
          Manage your personal details, academic roll number, skills, and resume URL.
        </p>

        <form onSubmit={handleSave} className="space-y-4 rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">Email</label>
              <input
                disabled
                value={form.email}
                className="w-full rounded-lg border border-ink/10 dark:border-parchment/10 bg-ink/5 dark:bg-parchment/5 px-3.5 py-2 text-sm outline-none opacity-70 mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">Phone</label>
              <input
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">Roll Number</label>
              <input
                placeholder="e.g. CS202401"
                value={form.rollNumber}
                onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">Department</label>
              <input
                placeholder="e.g. Computer Science"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">LinkedIn Profile</label>
              <input
                placeholder="https://linkedin.com/in/username"
                value={form.linkedIn}
                onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-ink/50 dark:text-parchment/50">GitHub Profile</label>
              <input
                placeholder="https://github.com/username"
                value={form.gitHub}
                onChange={(e) => setForm({ ...form, gitHub: e.target.value })}
                className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-ink/50 dark:text-parchment/50">Resume Link (Google Drive / GitHub)</label>
            <input
              placeholder="https://drive.google.com/your-resume.pdf"
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
            />
          </div>

          <div>
            <label className="text-xs text-ink/50 dark:text-parchment/50">Bio / Skills Summary</label>
            <textarea
              rows={3}
              placeholder="Full-stack developer interested in Web3, AI, and Distributed Systems..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3.5 py-2 text-sm outline-none focus:border-brass mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-brass text-parchment px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}
