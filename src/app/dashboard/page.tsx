"use client";

import Link from "next/link";
import { useCurrentUser } from "@/lib/useCurrentUser";
import Navbar from "@/components/Navbar";
import AIChatbot from "@/components/AIChatbot";

export default function DashboardPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <main>
        <Navbar user={null} />
        <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse space-y-4">
          <div className="h-8 w-64 bg-ink/10 dark:bg-parchment/10 rounded" />
          <div className="h-32 w-full bg-ink/10 dark:bg-parchment/10 rounded-lg" />
        </div>
      </main>
    );
  }

  const roleTitle = user?.role
    ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`
    : "Campus Dashboard";

  return (
    <main className="min-h-screen pb-16">
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-1">{roleTitle}</h1>
        <p className="text-ink/60 dark:text-parchment/60 mb-10">
          {user ? `Welcome back, ${user.name.split(" ")[0]}. Access your campus tools below.` : ""}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <Link
            href="/dashboard/attendance"
            className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all hover:-translate-y-0.5 bg-ink/5 dark:bg-parchment/5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl">Attendance Module</h2>
              <span className="text-xl">📊</span>
            </div>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {["faculty", "admin"].includes(user?.role || "")
                ? "Create sessions, track student attendance, and generate reports."
                : "View live attendance percentages, history, and subject analytics."}
            </p>
          </Link>

          <Link
            href="/dashboard/assignments"
            className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all hover:-translate-y-0.5 bg-ink/5 dark:bg-parchment/5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl">Assignment Portal</h2>
              <span className="text-xl">📚</span>
            </div>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {["faculty", "admin"].includes(user?.role || "")
                ? "Post assignments, set deadlines, and review student submissions & links."
                : "View pending assignments, submit solutions, and track submission status."}
            </p>
          </Link>

          <Link
            href="/dashboard/events"
            className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all hover:-translate-y-0.5 bg-ink/5 dark:bg-parchment/5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl">Events & Clubs</h2>
              <span className="text-xl">🎉</span>
            </div>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {["coordinator", "admin", "faculty"].includes(user?.role || "")
                ? "Publish campus events, set registration limits, and manage QR passes."
                : "Browse upcoming events, register, and get your digital QR event pass."}
            </p>
          </Link>

          <Link
            href="/dashboard/placements"
            className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all hover:-translate-y-0.5 bg-ink/5 dark:bg-parchment/5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-xl">Placement Notices</h2>
              <span className="text-xl">💼</span>
            </div>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {["coordinator", "admin", "faculty"].includes(user?.role || "")
                ? "Post job opportunities, packages (CTC), eligibility, and track applicants."
                : "View active campus placement drives, check eligibility, and apply with resume."}
            </p>
          </Link>
        </div>
      </div>

      <AIChatbot />
    </main>
  );
}
