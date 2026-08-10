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

  const role = user?.role || "student";

  const showAttendance = ["student", "faculty", "admin"].includes(role);
  const showAssignments = ["student", "faculty", "admin"].includes(role);
  const showEvents = ["student", "coordinator", "admin"].includes(role);
  const showPlacements = ["student", "coordinator", "admin"].includes(role);

  return (
    <main className="min-h-screen pb-16">
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-3xl">
              {role === "student" && "Student Dashboard"}
              {role === "faculty" && "Faculty Academic Dashboard"}
              {role === "coordinator" && "Events & Placement Coordinator Dashboard"}
              {role === "admin" && "Admin Control Panel & System Overview"}
            </h1>
            <span className="text-xs uppercase font-semibold rounded-full bg-brass/15 text-brass px-3 py-1">
              {role}
            </span>
          </div>
          <p className="text-sm text-ink/60 dark:text-parchment/60">
            Welcome back, <strong className="text-ink dark:text-parchment">{user?.name}</strong>. Here is your campus overview and quick actions.
          </p>
        </div>

        {/* STUDENT DASHBOARD METRICS OVERVIEW */}
        {role === "student" && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Today's Attendance Criteria</p>
              <p className="text-2xl font-display font-semibold text-moss mt-1">75% Target</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Status: Eligible for end-sem exams</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Homework Status</p>
              <p className="text-2xl font-display font-semibold mt-1">Assignments</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Submit links under Assignment Portal</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Digital Ticket Pass</p>
              <p className="text-2xl font-display font-semibold mt-1">Event Pass</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Check codes under Events & Clubs</p>
            </div>
          </div>
        )}

        {/* FACULTY DASHBOARD OVERVIEW */}
        {role === "faculty" && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Academic Scope</p>
              <p className="text-2xl font-display font-semibold mt-1">Class Attendance</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Create & mark attendance sessions</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Homework Review</p>
              <p className="text-2xl font-display font-semibold mt-1">Student Submissions</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Inspect student repository links</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Official Desk</p>
              <p className="text-2xl font-display font-semibold mt-1">Announcements</p>
              <Link href="/dashboard/notices" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                Publish campus notice →
              </Link>
            </div>
          </div>
        )}

        {/* COORDINATOR DASHBOARD OVERVIEW */}
        {role === "coordinator" && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Fest & Events Cell</p>
              <p className="text-2xl font-display font-semibold mt-1">Venue & Seats</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Manage registration capacity</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Placement Cell</p>
              <p className="text-2xl font-display font-semibold mt-1">Job Applicants</p>
              <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Review student resume links</p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Notice Board</p>
              <p className="text-2xl font-display font-semibold mt-1">Announcements</p>
              <Link href="/dashboard/notices" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                Publish announcement →
              </Link>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD OVERVIEW */}
        {role === "admin" && (
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-3">
            <h2 className="font-display text-xl font-semibold">Admin Master Control</h2>
            <p className="text-xs text-ink/60 dark:text-parchment/60">
              Manage user directory, assign roles (Student, Faculty, Coordinator, Admin), delete users, and view platform reports.
            </p>
            <div className="pt-2">
              <Link
                href="/dashboard/admin"
                className="rounded-full bg-brass text-parchment px-5 py-2 text-xs font-medium hover:opacity-90 transition-opacity inline-block"
              >
                Open Admin Control Panel →
              </Link>
            </div>
          </div>
        )}

        {/* Main Unique Navigation Modules Grid */}
        <div className="grid sm:grid-cols-2 gap-5 pt-4">
          {showAttendance && (
            <Link
              href="/dashboard/attendance"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-1.5"
            >
              <h2 className="font-display text-xl font-bold">Attendance Module</h2>
              <p className="text-xs text-ink/60 dark:text-parchment/60 leading-relaxed">
                {role === "faculty"
                  ? "Create subject attendance sessions and mark student presence."
                  : "Track subject-by-subject attendance percentages, present counts, and monthly breakdown."}
              </p>
            </Link>
          )}

          {showAssignments && (
            <Link
              href="/dashboard/assignments"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-1.5"
            >
              <h2 className="font-display text-xl font-bold">Assignment Portal</h2>
              <p className="text-xs text-ink/60 dark:text-parchment/60 leading-relaxed">
                {role === "faculty"
                  ? "Post academic assignments, set deadlines, and inspect student solution submissions."
                  : "View homework tasks, submit solution text or GitHub repository URLs, and track deadlines."}
              </p>
            </Link>
          )}

          {showEvents && (
            <Link
              href="/dashboard/events"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-1.5"
            >
              <h2 className="font-display text-xl font-bold">Events & Clubs</h2>
              <p className="text-xs text-ink/60 dark:text-parchment/60 leading-relaxed">
                {role === "coordinator"
                  ? "Publish campus fests, workshops, manage venue details and seat registration limits."
                  : "Register for upcoming campus fests, workshops, and view your digital ticket pass code."}
              </p>
            </Link>
          )}

          {showPlacements && (
            <Link
              href="/dashboard/placements"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-1.5"
            >
              <h2 className="font-display text-xl font-bold">Placement Cell</h2>
              <p className="text-xs text-ink/60 dark:text-parchment/60 leading-relaxed">
                {role === "coordinator"
                  ? "Post company job opportunities, package CTCs, eligibility, and review student applicants."
                  : "Explore active company job drives, view package CTCs, eligibility, and apply with your resume link."}
              </p>
            </Link>
          )}
        </div>
      </div>

      <AIChatbot />
    </main>
  );
}
