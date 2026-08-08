"use client";

import Link from "next/link";
import { useCurrentUser } from "@/lib/useCurrentUser";
import Navbar from "@/components/Navbar";

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

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-1">
          {user?.role === "faculty" ? "Faculty dashboard" : "Student dashboard"}
        </h1>
        <p className="text-ink/60 dark:text-parchment/60 mb-10">
          {user ? `Welcome back, ${user.name.split(" ")[0]}.` : ""}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <Link
            href="/dashboard/attendance"
            className="rounded-lg border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-colors"
          >
            <h2 className="font-display text-xl mb-2">Attendance</h2>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {user?.role === "faculty"
                ? "Create sessions and mark students present or absent."
                : "See your attendance percentage, subject by subject."}
            </p>
          </Link>

          <Link
            href="/dashboard/assignments"
            className="rounded-lg border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-colors"
          >
            <h2 className="font-display text-xl mb-2">Assignments</h2>
            <p className="text-sm text-ink/60 dark:text-parchment/60">
              {user?.role === "faculty"
                ? "Post assignments and track who has submitted."
                : "View open assignments and submit your work."}
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
